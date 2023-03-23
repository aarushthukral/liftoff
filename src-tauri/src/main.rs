#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};
use tauri_plugin_positioner::{Position, WindowExt};

fn main() {
    let reset_access_token =
        CustomMenuItem::new("reset_access_token".to_string(), "Reset Access Token");
    let refresh = CustomMenuItem::new("refresh".to_string(), "Refresh");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
    let system_tray_menu = SystemTrayMenu::new()
        .add_item(reset_access_token)
        .add_item(refresh)
        .add_item(quit);

    let mut app = tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    let window = app.get_window("main").unwrap();
                    let _ = window.move_window(Position::TrayCenter);

                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    "reset_access_token" => {
                        let window = app.get_window("main").unwrap();
                        let _ = window.move_window(Position::TrayCenter);

                        window.emit("resetAccessToken", ()).unwrap();

                        if !window.is_visible().unwrap() {
                            window.show().unwrap();
                        }
                        window.set_focus().unwrap();
                    }
                    "refresh" => {
                        let window = app.get_window("main").unwrap();
                        let _ = window.move_window(Position::TrayCenter);

                        window.emit("refresh", ()).unwrap();

                        if !window.is_visible().unwrap() {
                            window.show().unwrap();
                        }
                        window.set_focus().unwrap();
                    }
                    "hide" => {
                        let window = app.get_window("main").unwrap();
                        window.hide().unwrap();
                    }
                    _ => {}
                },
                _ => {}
            }
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(is_focused) => {
                if !is_focused {
                    event.window().hide().unwrap();
                }
            }
            _ => {}
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    #[cfg(target_os = "macos")]
    app.set_activation_policy(tauri::ActivationPolicy::Accessory);

    app.run(|_app_handle, _event| {});
}
