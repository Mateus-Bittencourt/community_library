import sqlite3 from "sqlite3";

const db = new sqlite3.Database("library_db.sqlite", (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
});

export default db;
