use chrono::Utc;
use sqlx::{FromRow, PgPool};
use uuid::Uuid;

#[derive(Debug, FromRow)]
pub struct TodoRow {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub created_at: chrono::NaiveDateTime,
}

#[async_trait::async_trait]
pub trait TodoRepository {
    async fn create(&self, title: &str, description: &str) -> Result<TodoRow, sqlx::Error>;
    async fn read(&self, id: Uuid) -> Result<Option<TodoRow>, sqlx::Error>;
    // Add methods for update, delete, and other operations as needed.
}

pub struct TodoRepositoryImpl {
    pool: PgPool,
}

impl TodoRepositoryImpl {
    pub fn new(pool: PgPool) -> Self {
        TodoRepositoryImpl { pool }
    }
}

// #[async_trait::async_trait]
// impl TodoRepository for TodoRepositoryImpl {
//     async fn create(&self, title: &str, description: &str) -> Result<TodoRow, sqlx::Error> {
//         let created_at = Utc::now().naive_utc();
//         let row = sqlx::query_as!(
//             TodoRow,
//             "INSERT INTO todos (id, title, description, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
//             Uuid::new_v4(),
//             title,
//             description,
//             created_at,
//         )
//         .fetch_one(&self.pool)
//         .await?;

//         Ok(row)
//     }

//     async fn read(&self, id: Uuid) -> Result<Option<TodoRow>, sqlx::Error> {
//         let row = sqlx::query_as!(TodoRow, "SELECT * FROM todos WHERE id = $1", id,)
//             .fetch_optional(&self.pool)
//             .await?;

//         Ok(row)
//     }

//     // Implement other methods for update, delete, and other operations as needed.
// }
