import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import CreateTodo from "./components/CreateTodo";
import "./App.css";
import { describe } from "node:test";
interface TodoProps {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  __v: number;
}

function App() {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  function fetchTodo() {
    const myHeader = new Headers();
    myHeader.append("id", "0");
    fetch(`${backendURL}todos`, {
      method: "GET",
      headers: myHeader,
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      <div>
        <div>
          <CreateTodo fetchTodo={fetchTodo} />
        </div>
        <div>
          {todos.map((e) => {
            return (
              <Todo
                key={e._id}
                _id={e._id}
                title={e.title}
                description={e.description}
                completed={e.completed}
                __v={e.__v}
                fetchTodo={fetchTodo}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
