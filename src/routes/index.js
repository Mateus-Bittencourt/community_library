import { Router } from "express";
import userRoutes from "./user.routes.js";
import bookRoutes from "./book.routes.js";
import loanRouter from "./loan.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/loans", loanRouter);

export { router };
