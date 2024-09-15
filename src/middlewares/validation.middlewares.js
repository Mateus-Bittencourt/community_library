import { userIdSchema } from "../schema/user.schema.js";
import { bookIdSchema } from "../schema/book.schema.js";


const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: err.errors });
  }
};

const validateUserId = (req, res, next) => {
  try {
    const userId = +req.params.id;
    userIdSchema.parse({ userId });
    next()
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
}

const validateBookId = (req, res, next) => {
  try {
    const bookId = +req.params.id;
    bookIdSchema.parse({ bookId });
    next()
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
}

export { validate, validateUserId, validateBookId };
