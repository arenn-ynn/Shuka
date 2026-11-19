CREATE TABLE sessions (token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at TEXT NOT NULL) STRICT;
CREATE INDEX idx_sessions_expiration ON sessions(expires_at);
