import userRepository from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";
import { generateJWT } from "./auth.service.js";

async function createUserService(newUser) {
  const foundUser = await userRepository.findUserByEmailRepository(
    newUser.email
  );
  if (foundUser) throw new Error("User already exists!");

  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  const user = await userRepository.createUserRepository({
    ...newUser,
    password: hashedPassword,
  });
  if (!user) throw new Error("Error creating user");
  return generateJWT(user.id);
}

const findAllUsersService = async () =>
  await userRepository.findAllUsersRepository();

const findUserByIdService = async (id) => {
  const user = await userRepository.findUserByIdRepository(id);
  if (!user) throw new Error("User not found!");
  return user;
};

const updateUserService = async (userId, newUser) => {
  const user = await userRepository.findUserByIdRepository(userId);
  if (!user) throw new Error("User not found!");
  if (newUser.password)
    newUser.password = await bcrypt.hash(newUser.password, 10);
  const updatedUser = await userRepository.updateUserRepository(
    userId,
    newUser
  );
  return updatedUser;
};

const deleteUserService = async (userId) => {
  const user = await userRepository.findUserByIdRepository(userId);
  if (!user) throw new Error("User not found!");
  return await userRepository.deleteUserRepository(userId);
};

export default {
  createUserService,
  findAllUsersService,
  findUserByIdService,
  updateUserService,
  deleteUserService,
};
