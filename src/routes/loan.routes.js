import { Router } from "express";
import loanController from "../controllers/loan.controller.js";
import { validate, validateId } from "../middlewares/validation.middlewares.js"
import { loanSchema } from "../schema/loan.schema.js";

const router = Router();

router.post("/loans", validate(loanSchema), loanController.createLoanController);
router.get("/loans", loanController.findAllLoansController);
router.get("/loans/:id", validateId, loanController.findLoanByIdController);
router.delete("/loans/:id", validateId, loanController.deleteLoanController);

export default router;
