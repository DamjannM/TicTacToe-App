import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync(":memory:");

db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
    )
    `);

db.exec(`
    CREATE TABLE game (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    board TEXT,
    player TEXT,
    turn TEXT,
    game_ended BOOLEAN DEFAULT 0,
    game_result TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id))`);
export default db;
