use chrono::Utc;
use error::make_error;
use sqlx::{FromRow, PgPool};
use uuid::Uuid;

type Error = Box<dyn std::error::Error + Send + Sync>;

#[derive(Debug, FromRow)]
pub struct TodoRow {}
