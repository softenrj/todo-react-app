import express from "express";
import mongoose from "mongoose";
import env from "dotenv/config";
import cors from "cors";
import Todo from "./models/Todo.js";

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extends: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
mongoose.Schema();

app.get("/todos", async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
});

app.post("/todos", async (req, res) => {
  const newtodo = new Todo({ text: req.body.text });
  await newtodo.save();
  res.json(newtodo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(port, () => {
  console.log(`server is live on port ${port}`);
});
