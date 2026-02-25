require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔹 Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// 🔹 Todo Schema
const todoSchema = new mongoose.Schema({
  task: String
});

const Todo = mongoose.model("Todo", todoSchema);

// Home
app.get("/", (req, res) => {
  res.send("CI/CD LIVE 🚀");
});

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add todo
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({ task: req.body.task });
  await newTodo.save();
  res.status(201).json(newTodo);
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
