import bookController from "../controllers/book.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate, validateId } from "../middlewares/validation.middlewares.js";
import { bookSchema } from "../schema/book.schema.js";

const router = Router();

router.get("/", bookController.findAllBooksController);
router.use(authMiddleware);
router.post("/", validate(bookSchema), bookController.createBookController);
router.get("/search", bookController.searchBooksController);
router.get("/:id", validateId, bookController.findBookByIdController);
router.patch("/:id", validateId, bookController.updateBookController);
router.delete("/:id", validateId, bookController.deleteBookController);

export default router;
