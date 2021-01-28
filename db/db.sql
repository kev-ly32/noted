CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE notes (
    note_id BIGSERIAL PRIMARY KEY,
    text TEXT,
    xpos INTEGER,
    ypos INTEGER,
    user_id BIGINT
);