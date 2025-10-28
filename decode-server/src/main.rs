use serde::{Deserialize, Serialize};

#[derive(Clone)]
pub struct User {
    pub uid: String,
    pub email: String,
    pub pw: String,
    pub role: String,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub pw: String,
}

pub struct LoginResponse {
    pub token: String,
}
fn main() {}
