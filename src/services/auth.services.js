import jwt from "jsonwebtoken";
import "dotenv/config"
import userRepository from "../repositories/user.repositories.js"
import bcrypt from "bcrypt";

const generateJWT = (id) =>
  jwt.sign(
    { id },
    process.env.SECRET_JWT,
    { expiresIn: 86400 }
  );

const loginService = async (email, password) => {
  const user = await userRepository.findUserByEmailRepository(email);
  if (!user) throw new Error("Invalid email or password");

  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) throw new Error("Invalid email or password");

  return generateJWT(user.id);
};

export { generateJWT, loginService };
