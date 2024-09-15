import db from "../config/database.js";

db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

const createBookRepository = (newBook, userId) => {
  const { title, author } = newBook;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO books (title, author, user_id)
      VALUES (?,?,?)`,
      [title, author, userId],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...newBook });
      }
    );
  });
};

const findAllBooksRepository = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM books`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const finBookByIdRepository = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM books WHERE id = ?`, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const updateBookRepository = (id, book) => {
  console.log(id, book);
  return new Promise((resolve, reject) => {
    const fields = ["title", "author", "user_id"];
    let query = "UPDATE books SET";
    const values = [];
    if (book.userId) book["user_id"] = book.userId;

    fields.forEach((field) => {
      if (book[field] !== undefined) {
        query += ` ${field} = ?,`;
        values.push(book[field]);
      }
    });
    delete book["user_id"];

    query = query.slice(0, -1) + " WHERE id = ?";
    values.push(id);

    db.run(query, values, function (err) {
      if (err) reject(err);
      else resolve({ book: this });
    });
  });
};

const deleteBookRepository = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM books WHERE id =?`, [id], (err) => {
      if (err) reject(err);
      else resolve({ message: "Book deleted successfully", book: { id: id } });
    });
  });
};

const searchBookRepository = (queryString) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`,
      ["%" + queryString + "%", "%" + queryString + "%"],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

export default {
  createBookRepository,
  findAllBooksRepository,
  finBookByIdRepository,
  updateBookRepository,
  deleteBookRepository,
  searchBookRepository,
};
