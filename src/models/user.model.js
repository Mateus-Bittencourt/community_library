import userRepository from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

async function createUserModel(newUser) {
  const foundUser = await userRepository.findUserByEmail(newUser.email);
  if (foundUser) throw new Error("User already exists!");

  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  const user = await userRepository.createUserRepository({
    ...newUser,
    password: hashedPassword,
  });
  if (!user) throw new Error("Error creating user");
  return user;
}

export default {
  createUserModel,
};
