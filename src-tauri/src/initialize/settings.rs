use std::fs::copy;

use tauri::{is_dev, AppHandle, Manager};

pub fn settings_init(app: &AppHandle) {
  let settings_path = app
    .path()
    .resolve(".chorus/settings.toml", tauri::path::BaseDirectory::Home)
    .expect("Should resolve a path");

  let default_settings_path = app
    .path()
    .resolve(
      "defaults/settings.toml",
      tauri::path::BaseDirectory::Resource,
    )
    .expect("Should have a default path");

  if is_dev() || !settings_path.exists() {
    let result = copy(default_settings_path, settings_path).unwrap();
    println!("Default settings copied: {result}");
  } else {
    println!("Settings already exist");
  }
}
