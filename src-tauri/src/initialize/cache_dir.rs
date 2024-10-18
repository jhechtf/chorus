use std::fs::write;
use tauri::{AppHandle, Manager};
pub fn cache_dir_init(app: &AppHandle) {
  let cache_dir = app
    .path()
    .resolve("latest.txt", tauri::path::BaseDirectory::AppCache)
    .expect("Cache dir should exist");
  if !cache_dir.exists() {
    println!("Creating latest.txt");
    write(cache_dir, "").unwrap();
  } else {
    println!("latest.txt already exists");
  }
}
