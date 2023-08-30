// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use window_shadows::set_shadow;
use window_vibrancy::apply_mica;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .setup(|app: &mut tauri::App| {
            let window = app.get_window("main").unwrap();

            let theme = window.theme().unwrap();
            println!("Theme: {:?}", theme);

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
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
