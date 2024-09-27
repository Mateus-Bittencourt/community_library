import { Router } from "express";
import loanController from "../controllers/loan.controller.js";
import { validate, validateId } from "../middlewares/validation.middlewares.js";
import { loanSchema } from "../schema/loan.schema.js";

const router = Router();

router.post("/", validate(loanSchema), loanController.createLoanController);
router.get("/", loanController.findAllLoansController);
router.get("/:id", validateId, loanController.findLoanByIdController);
router.delete("/:id", validateId, loanController.deleteLoanController);

export default router;
