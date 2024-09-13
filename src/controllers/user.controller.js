import userService from "../services/user.service.js";
import { loginService } from "../services/auth.service.js";

const createUserController = async (req, res) => {
  const newUser = req.body;

  try {
    const token = await userService.createUserService(newUser);
    res.status(201).send({ token });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const getAllUsersController = async (_req, res) => {
  try {
    const users = await userService.findAllUsersService();
    res.send({ users });
  } catch (e) {
    return res.status(404).send(e.message);
  }
};

const findUserByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.findUserByIdService(id);
    res.send({ user });
  } catch (e) {
    return res.status(404).send(e.message);
  }
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  try {
    const updatedUser = await userService.updateUserService(id, newUser);
    res.send({ user: updatedUser });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const { message } = await userService.deleteUserService(id);
    res.send({ message });
  } catch (e) {
    return res.status(404).send(e.message);
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await loginService(email, password);
    res.send({ token });
  } catch (e) {
    return res.status(400).send(e.message);
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
