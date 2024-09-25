import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import bookRoutes from "./src/routes/book.routes.js";
import loanRouter from "./src/routes/loan.routes.js";
import "dotenv/config"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRoutes);
app.use(bookRoutes);
app.use(loanRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
