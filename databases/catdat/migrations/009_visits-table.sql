CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    theme TEXT NOT NULL CHECK (theme in ('dark', 'light')),
    device_type TEXT NOT NULL CHECK (device_type in ('mobile', 'tablet', 'desktop')),
    country TEXT
);