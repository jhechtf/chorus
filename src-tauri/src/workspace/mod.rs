#[derive(serde::Serialize)]
pub struct Workspace {
  dirs: Vec<String>,
}

impl Workspace {
  pub fn new() -> Self {
    Self { dirs: vec![] }
  }
  pub fn add(&mut self, path: String) {
    self.dirs.push(path);
  }
  pub fn remove(&mut self, path: String) {
    self.dirs.retain(|x| x != &path);
  }
}
