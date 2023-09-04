// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::process::{kill_children, Command, CommandEvent};
use tauri::{Manager, WindowEvent};
use window_shadows::set_shadow;
use window_vibrancy::apply_mica;

fn main() {
    tauri::Builder::default()
        .setup(|app: &mut tauri::App| {
            kill_children();
            let window = app.get_window("main").unwrap();

            #[cfg(target_os = "windows")]
            apply_mica(&window, Some(true)).expect("Failed to apply mica");

            #[cfg(any(windows, target_os = "windows"))]
            set_shadow(&window, true).expect("Failed to set shadow");

            window.minimize().unwrap();
            window.unminimize().unwrap();

            window.maximize().unwrap();
            window.unmaximize().unwrap();

            let aria_conf = app
                .path_resolver()
                .resolve_resource("conf/aria.conf")
                .expect("failed to resolve resource");

            let app_data = app.path_resolver().app_log_dir().unwrap();
            println!("app_data {:?} ", app_data.to_str().unwrap());

            // run aria as daemon process with conf file
            let (mut rx, _child) = Command::new_sidecar("aria2c")
                .expect("failed to create `aria2c` binary command")
                .args(&[
                    "--conf-path",
                    aria_conf.to_str().unwrap().split("?\\").last().unwrap(),
                    "-d",
                    "D:\\",
                ])
                .spawn()
                .expect("Failed to spawn sidecar");

            tauri::async_runtime::spawn(async move {
                // read events such as stdout
                while let Some(event) = rx.recv().await {
                    if let CommandEvent::Stdout(line) = event {
                        println!("stdout: {}", line);
                        window.emit("aria", "payload").unwrap();
                    } else if let CommandEvent::Stderr(line) = event {
                        println!("stderr: {}", line);
                    }
                }

                window.on_window_event(move |event| match event {
                    WindowEvent::Destroyed => {
                        println!("window destroyed");
                        kill_children();
                    }
                    _ => {}
                })
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![start_download])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn start_download(window: tauri::Window, url: String) {
    let (mut rx, mut child) = Command::new_sidecar("aria2c")
        .expect("failed to create `yt-dlp` binary command")
        .args(&[url])
        .spawn()
        .expect("Failed to spawn sidecar");

    tauri::async_runtime::spawn(async move {
        // read events such as stdout
        while let Some(event) = rx.recv().await {
            if let CommandEvent::Stdout(line) = event {
                println!("stdout: {}", line);
                window
                    .emit("message", Some(format!("'{}'", line)))
                    .expect("failed to emit event");
                // write to stdin
                child.write("message from Rust\n".as_bytes()).unwrap();
            }
        }
    });
}
