// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::process::{Command, CommandEvent};
use tauri::Manager;
use window_shadows::set_shadow;
use window_vibrancy::apply_mica;

#[derive(Clone, serde::Serialize)]
struct Payload {
    progress: String,
    speed: String,
    eta: String,
    downloaded: String,
}

fn extract_ytdl_output(input: &str) -> Option<[String; 4]> {
    if input.contains("ETA") == false {
        return None;
    }

    let parts: Vec<&str> = input.split_whitespace().collect();

    if let (Some(progress_idx), Some(at_idx), Some(eta_idx)) = (
        parts.iter().position(|&part| part.ends_with('%')),
        parts.iter().position(|&part| part == "at"),
        parts.iter().position(|&part| part == "ETA"),
    ) {
        let progress = parts[progress_idx].trim_end_matches('%').to_string();
        let downloaded = parts[progress_idx + 3].to_string();
        let speed = parts[at_idx + 1].to_string();
        let eta = parts[eta_idx + 1].to_string();

        println!("Progress: {}", progress);
        println!("Speed: {}", speed);
        println!("ETA: {}", eta);
        println!("Downloaded: {}", downloaded);

        return Some([progress, speed, eta, downloaded]);
    }

    None
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_url(url: String) {
    println!("URL: {}", url);
}

#[tauri::command]
fn add_download(app_handle: tauri::AppHandle, window: tauri::Window, url: String) {
    println!("Button Clicked",);

    // app_handle
    //     .emit_all(
    //         "progress",
    //         Payload {
    //             progress: "Tauri is awesome!".into(),
    //         },
    //     )
    //     .unwrap();

    let (mut rx, mut child) = Command::new_sidecar("yt-dlp")
        .expect("failed to create `yt-dlp` binary command")
        .args([url.as_str(), "-o", "D:\\"])
        .spawn()
        .expect("Failed to spawn sidecar");

    tauri::async_runtime::spawn(async move {
        // read events such as stdout
        while let Some(event) = rx.recv().await {
            if let CommandEvent::Stdout(line) = event {
                if line.contains("ETA") {
                    let line_clone = line.clone();
                    println!("Line: {}", line_clone);
                    if let Some([progress, speed, eta, downloaded]) =
                        extract_ytdl_output(&line_clone)
                    {
                        app_handle
                            .emit_all(
                                "progress",
                                Payload {
                                    progress,
                                    downloaded,
                                    speed,
                                    eta,
                                },
                            )
                            .unwrap();
                    }
                }

                window
                    .emit("message", Some(format!("'{}'", line)))
                    .expect("failed to emit event");
                // write to stdin
                child.write("message from Rust\n".as_bytes()).unwrap();
            } else if let CommandEvent::Stderr(err) = event {
                window
                    .emit("error", Some(format!("'{}'", err)))
                    .expect("failed to emit event");
            } else if let CommandEvent::Terminated(status) = event {
                window
                    .emit("done", Some(format!("'{}'", status.code.unwrap())))
                    .expect("failed to emit event");
            }
        }
    });
}

fn main() {
    tauri::Builder::default()
        .setup(|app: &mut tauri::App| {
            let window = app.get_window("main").unwrap();

            // let theme = window.theme().unwrap();

            #[cfg(target_os = "windows")]
            apply_mica(&window, Some(true)).expect("Failed to apply mica");

            #[cfg(any(windows, target_os = "windows"))]
            set_shadow(&window, true).expect("Failed to set shadow");

            window.minimize().unwrap();
            window.unminimize().unwrap();

            window.maximize().unwrap();
            window.unmaximize().unwrap();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_url, add_download])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
