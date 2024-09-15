import bookService from "../services/book.services.js";

async function createBookController(req, res) {
  const newBook = req.body;
  const userId = req.userId;

  try {
    const createdBook = await bookService.createBookService(newBook, userId);
    res.status(201).send(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function findAllBooksController(req, res) {
  try {
    const books = await bookService.findAllBooksService();
    res.send(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function findBookByIdController(req, res) {
  const bookId = req.params.id;

  try {
    const book = await bookService.findBookByIdService(bookId);
    res.send(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function updateBookController(req, res) {
  const bookId = req.params.id;
  const updatedBook = req.body;
  const userId = req.userId;

  try {
    const response = await bookService.updateBookService(
      bookId,
      updatedBook,
      userId
    );
    res.send(response);
  } catch (error) {
    let status_code = 400;
    if (error.message === "Unauthorized access") status_code = 403;
    if (error.message === "Book not found!") status_code = 404;
    res.status(status_code).json({ message: error.message });
  }
}

async function deleteBookController(req, res) {
  const bookId = req.params.id;
  const userId = req.userId;

  try {
    await bookService.deleteBookService(bookId, userId);
    res.sendStatus(204);
  } catch (error) {
    let status_code = 400;
    if (error.message === "Unauthorized access") status_code = 403;
    if (error.message === "Book not found!") status_code = 404;
    res.status(status_code).json({ message: error.message });
  }
}

async function searchBooksController(req, res) {
  const {queryString} = req.query;
  try {
    const books = await bookService.searchBooksService(queryString);
    res.send(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export default {
  createBookController,
  findAllBooksController,
  findBookByIdController,
  updateBookController,
  deleteBookController,
  searchBooksController,
};
