-- USERS
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, --we use SERIAL so that it increments ids automatically
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL CHECK(role('client', 'freelancer', 'admin')), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)

-- JOBS
CREATE TABLE IF NOT EXISTS jobs(
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES users(id) on DELETE CASCADE, --Deletes child rows if parent is deleted
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)

-- PROPOSALS
CREATE TABLE IF NOT EXISTS proposals(
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(id) on DELETE CASCADE,
    freelancer_id INTEGER NOT NULL REFERENCES users(id) on DELETE CASCADE,
    cover_letter TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(id) on DELETE CASCADE,
    sender_id INTEGER NOT NULL REFERENCES users(id) on DELETE CASCADE,
    receiver_id INTEGER NOT NULL REFERENCES users(id) on DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)