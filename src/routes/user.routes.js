import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validate, validateId } from "../middlewares/validation.middlewares.js";
import { userSchema } from "../schema/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", validate(userSchema), userController.createUserController);

router.post("/login", userController.loginUserController);

router.use(authMiddleware);

router.get("/", userController.getAllUsersController);

router.get("/:id", validateId, userController.findUserByIdController);

router.patch("/:id", validateId, userController.updateUserController);

router.delete("/users/:id", validateId, userController.deleteUserController);

export default router;
