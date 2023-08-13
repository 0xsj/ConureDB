use crate::error::make_error;
use chrono::Utc;
use sqlx::{FromRow, PgPool};
use uuid::Uuid;

type Error = Box<dyn std::Error + Send + Sync>;

#[derive(Debug, FromRow)]
pub struct TodoRow {}
