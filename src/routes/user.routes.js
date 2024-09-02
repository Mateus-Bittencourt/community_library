import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/users", userController.createUserController);

export default router;
