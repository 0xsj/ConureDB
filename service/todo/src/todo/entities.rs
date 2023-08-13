use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize)]
pub struct Todo {
    pub id: Uuid,
    title: String,
    description: String,
    created_at: DateTime<Utc>,
}

impl Todo {
    pub fn new(id: Uuid, title: String, description: String) -> Self {
        let now = Utc::now();
        Self {
            id,
            title,
            description,
            created_at: now,
        }
    }
}
