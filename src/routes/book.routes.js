import bookController from "../controllers/book.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate, validateId } from "../middlewares/validation.middlewares.js";
import { bookSchema } from "../schema/book.schema.js";

const router = Router();

router.get("/books", bookController.findAllBooksController);
router.use(authMiddleware);
router.post(
  "/books",
  validate(bookSchema),
  bookController.createBookController
);
router.get("/books/search", bookController.searchBooksController);
router.get("/books/:id", validateId, bookController.findBookByIdController);
router.patch("/books/:id", validateId, bookController.updateBookController);
router.delete("/books/:id", validateId, bookController.deleteBookController);


export default router;
