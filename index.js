import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import "dotenv/config"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
