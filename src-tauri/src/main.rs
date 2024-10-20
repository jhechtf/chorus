// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::read;
use tauri::{generate_handler, Manager};

mod handlers;
mod initialize;
mod workspace;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_fs::init())
    .setup(|app| {
      initialize::init(app.app_handle());
      // Going to need to grab the workspace file
      let latest_txt = app.path().app_cache_dir().unwrap().join("last.txt");
      let content_str = String::from_utf8(read(latest_txt).unwrap()).unwrap();
      println!("Content: {content_str:?}");
      app.manage(workspace::Workspace::new());
      Ok(())
    })
    .invoke_handler(generate_handler![
      handlers::settings::get_settings,
      handlers::custom_resolve::chorus_resolve
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
