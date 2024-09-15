import bookRepository from "../repositories/book.repositories.js";
import userRepository from "../repositories/user.repositories.js";

async function createBookService(newBook, userId) {
  const createdBook = await bookRepository.createBookRepository(
    newBook,
    userId
  );
  if (!createdBook) throw new Error("Error creating book");
  return createdBook;
}

const findAllBooksService = async () =>
  await bookRepository.findAllBooksRepository();

async function findBookByIdService(bookId) {
  const book = await bookRepository.finBookByIdRepository(bookId);
  if (!book) throw new Error("Book not found!");
  return book;
}

async function updateBookService(bookId, updatedBook, userId) {
  const book = await bookRepository.finBookByIdRepository(bookId);
  if (!book) throw new Error("Book not found!");

  if (book.user_id !== userId) throw new Error("Unauthorized access");

  if (userId){
    const user  = userRepository.findOneByUserId(userId);
    if (!user) throw new Error("User not found! Please send a valid userId!");
  }

  return await bookRepository.updateBookRepository(bookId, updatedBook);
}

async function deleteBookService(bookId, userId) {
  const book = await bookRepository.finBookByIdRepository(bookId);
  if (!book) throw new Error("Book not found!");

  if (book.user_id !== userId) throw new Error("Unauthorized access");

  return await bookRepository.deleteBookRepository(bookId);
}

const searchBooksService = async (queryString) =>
  !queryString
    ? await bookRepository.findAllBooksRepository()
    : await bookRepository.searchBookRepository(queryString);

export default {
  createBookService,
  findAllBooksService,
  findBookByIdService,
  updateBookService,
  deleteBookService,
  searchBooksService,
};
