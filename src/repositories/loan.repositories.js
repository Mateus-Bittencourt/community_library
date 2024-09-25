import db from "../config/database.js";

db.run(`
  CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    book_id INTEGER,
    due_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
  )
`);

const createLoanRepository = (userId, bookId, dueDate) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO loans (user_id, book_id, due_date)
      VALUES (?,?,?)`,
      [userId, bookId, dueDate],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, userId: userId, bookId: bookId, dueDate: dueDate });
      }
    );
  });
};

const findAllLoansRepository = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM loans`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const findLoanByIdRepository = (loanId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM loans WHERE id = ?`, [loanId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

const deleteLoanRepository = (loanId) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM loans WHERE id = ?`, [loanId], (err) => {
      if (err) reject(err);
      else resolve({ message: "Loan deleted successfully", loanId});
    });
  });
}

export default {
  createLoanRepository,
  findAllLoansRepository,
  findLoanByIdRepository,
  deleteLoanRepository,
};
