import { useEffect, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(`http://localhost:3000/todos`);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text) return;
    const res = await axios.post(`http://localhost:3000/todos`, { text });
    setTodos([...todos, res.data]);
    setText("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-app min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-center mb-6 text-cyan-400">
          📝 My Todo List
        </h1>

        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Add a task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={addTodo}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg"
            >
              <span className="break-words">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-400 hover:text-red-600 transition text-xl"
                title="Delete"
              >
                <DeleteOutlineIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
