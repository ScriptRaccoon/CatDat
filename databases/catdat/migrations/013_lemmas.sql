CREATE TABLE lemmas (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    claim TEXT NOT NULL,
    proof TEXT NOT NULL
);