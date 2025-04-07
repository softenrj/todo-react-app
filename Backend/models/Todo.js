import mongoose from "mongoose";

const TODO = mongoose.Schema({
    text: String,
})

const Todo = mongoose.model('Todo',TODO);
export default Todo
