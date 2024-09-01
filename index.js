import express from "express";
const app = express();
app.use(express.json());
const users = [];

app.post("/users", (req, res) => {
  const body = req.body;
  users.push(body);
  res.status(201);
  res.end();
});

app.get("/users", (req, res) => {
  res.json({users});
});

app.listen(3000, () => console.log("Server running on port 3000"));
