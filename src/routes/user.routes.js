import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validate, validateUserId } from "../middlewares/validation.middlewares.js";
import { userSchema } from "../schema/user.schema.js";

const router = Router();

router.post(
  "/users",
  validate(userSchema),
  userController.createUserController
);

router.get("/users", userController.getAllUsersController);

router.get("/users/:id", validateUserId, userController.findUserByIdController);

router.patch(
  "/users/:id",
  validateUserId,
  userController.updateUserController
);

router.delete("/users/:id", validateUserId, userController.deleteUserController);

export default router;
