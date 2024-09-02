import userModel from "../models/user.model.js";

const createUserController = async (req, res) => {
  const newUser = req.body;

  try {
    const user = await userModel.createUserModel(newUser);
    res.status(201).send({ user });
  } catch (e) {
    console.log("cheguei aqui")
    return res.status(400).send(e.message);
  }
};

export default {
  createUserController,
};
