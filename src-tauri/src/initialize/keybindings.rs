use std::fs::copy;

use tauri::{is_dev, AppHandle, Manager};

pub fn keybindings_init(app: &AppHandle) {
  let keybindings_path = app
    .path()
    .resolve(".chorus/keybindings.toml", tauri::path::BaseDirectory::Home)
    .expect("Should resolve a path");

  let default_keybindings_path = app
    .path()
    .resolve(
      "defaults/keybindings.toml",
      tauri::path::BaseDirectory::Resource,
    )
    .expect("Should have a default path");

  if is_dev() || !keybindings_path.exists() {
    let result = copy(default_keybindings_path, keybindings_path).unwrap();
    println!("Default keybindings copied: {result}");
  } else {
    println!("Keybindings already exist");
  }
}
