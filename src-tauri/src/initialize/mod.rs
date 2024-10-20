use tauri::AppHandle;

mod cache_dir;
mod keybindings;
mod settings;

pub fn init(app: &AppHandle) {
  // Add other things here for setup
  keybindings::keybindings_init(app);
  cache_dir::cache_dir_init(app);
  settings::settings_init(app);
}
