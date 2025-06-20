use super::CmdResult;
use tauri::Manager;

// 初始化
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_upload::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            None,
        ))
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(window) = app.get_webview_window("tdesign-template") {
                // 如果窗口最小化了，先恢复
                let _ = window.unminimize();
                // 显示window窗口
                let _ = window.show();
                // 然后将窗口激活、置顶
                let _ = window.set_focus();
            }
        }))
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/// 打开/关闭开发者工具
#[tauri::command]
pub fn open_devtools(app_handle: tauri::AppHandle) {
    if let Some(window) = app_handle.get_webview_window("tdesign-template") {
        if !window.is_devtools_open() {
            window.open_devtools();
        } else {
            window.close_devtools();
        }
    }
}