use tauri::{AppHandle, Manager};

#[tauri::command]
pub fn chorus_resolve(
  app: AppHandle,
  path: &str,
  base_directory: Option<tauri::path::BaseDirectory>,
) -> Result<String, String> {
  let path_buf = app
    .path()
    .resolve(
      path,
      base_directory.unwrap_or(tauri::path::BaseDirectory::Home),
    )
    .unwrap();
  let return_value = path_buf.to_string_lossy().to_string();
  Ok(return_value)
}
