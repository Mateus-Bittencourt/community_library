import jwt from "jsonwebtoken";
import "dotenv/config"
import userService from "../services/user.services.js";


export const authMiddleware = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) return res.status(401).send({ message: "Access denied. No token provided."});

  const partsToken = tokenHeader.split(" ");
  if (partsToken.length !== 2) return res.status(401).send({ message: "Invalid token!" });

  const [schema, token] = partsToken

  if(!/^Bearer$/i.test(schema)) return res.status(401).send({ message: "Malformed token!" });

  jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
    if (err) return res.status(401).send({ message: "Invalid token!" });
    const user = await userService.findUserByIdService(decoded.id);

    if (!user || !user.id) return res.status(403).send({ message: "Access denied. User not found." });

    req.userId = user.id

    next();
  });

}
