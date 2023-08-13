use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Serialize, Deserialize)]
pub enum Todo {
  pub id: sqlx::types::Uuid,
  title: String,
  description: String,
  created_at: DateTime<Utc>,
}