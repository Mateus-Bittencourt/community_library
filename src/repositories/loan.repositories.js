import db from "../config/database.js";
import { toCamelCase } from "../utils/format.utils.js";

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
        else
          resolve({
            id: this.lastID,
            userId: userId,
            bookId: bookId,
            dueDate: dueDate,
          });
      }
    );
  });
};

const findAllLoansRepository = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT loans.id, loans.due_date, users.email, books.title
        FROM loans
        JOIN users ON loans.user_id = users.id
        JOIN books ON loans.book_id = books.id
       `,
      [],
      (err, rows) => {
        if (err) reject(err);
        else {
          const camelCaseRows = rows.map((row) => toCamelCase(row));
          resolve(camelCaseRows);
        }
      }
    );
  });
};

const findLoanByIdRepository = (loanId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM loans WHERE id = ?`, [loanId], (err, row) => {
      if (err) reject(err);
      else resolve(toCamelCase(row));
    });
  });
};

const deleteLoanRepository = (loanId) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM loans WHERE id = ?`, [loanId], (err) => {
      if (err) reject(err);
      else resolve({ message: "Loan deleted successfully", loanId });
    });
  });
};

export default {
  createLoanRepository,
  findAllLoansRepository,
  findLoanByIdRepository,
  deleteLoanRepository,
};
