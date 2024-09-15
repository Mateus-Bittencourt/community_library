import userService from "../services/user.services.js";
import { loginService } from "../services/auth.services.js";

const createUserController = async (req, res) => {
  const newUser = req.body;

  try {
    const token = await userService.createUserService(newUser);
    res.status(201).send({ token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAllUsersController = async (_req, res) => {
  try {
    const users = await userService.findAllUsersService();
    res.send({ users });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const findUserByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.findUserByIdService(id);
    res.send({ user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  try {
    const updatedUser = await userService.updateUserService(id, newUser);
    res.send({ user: updatedUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const { message } = await userService.deleteUserService(id);
    res.send({ message });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await loginService(email, password);
    res.send({ token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export default {
  createUserController,
  getAllUsersController,
  findUserByIdController,
  updateUserController,
  deleteUserController,
  loginUserController,
};
