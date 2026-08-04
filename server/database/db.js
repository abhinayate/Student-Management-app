const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'students.sqlite');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    grade INTEGER NOT NULL,
    section TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    admission_date TEXT NOT NULL
  )
`);

module.exports = db;
