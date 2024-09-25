// import { userIdSchema } from "../schema/user.schema.js";
// import { bookIdSchema } from "../schema/book.schema.js";

import { idSchema } from "../schema/id.schema.js"

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: err.errors });
  }
};

const validateId = (req, res, next) => {
  try {
    const id = +req.params.id;
    idSchema.parse({ id });
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export { validate, validateId };

// const validateUserId = (req, res, next) => {
//   try {
//     const userId = +req.params.id;
//     userIdSchema.parse({ userId });
//     next();
//   } catch (error) {
//     res.status(400).json({ error: error.errors });
//   }
// };

// const validateBookId = (req, res, next) => {
//   try {
//     const bookId = +req.params.id;
//     bookIdSchema.parse({ bookId });
//     next();
//   } catch (error) {
//     res.status(400).json({ error: error.errors });
//   }
// };

// const validateLoanId = (req, res, next) => {
//   try {
//     const loanId = +req.params.id;
//     loanIdSchema.parse({ loanId });
//     next();
//   } catch (error) {
//     res.status(400).json({ error: error.errors });
//   }
// };

// export { validate, validateUserId, validateBookId, validateLoanId };
