import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import CreateTodo from "./components/CreateTodo";
import "./App.css";

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
        let notChecked: TodoProps[] = [];
        let checked: TodoProps[] = [];
        data.forEach((todo: TodoProps) => {
          if (todo.completed) {
            checked.push(todo);
          } else {
            notChecked.push(todo);
          }
        });
        const todos = notChecked.concat(checked);
        setTodos(todos);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      <div className="w-[750px] h-[650px] rounded-3xl p-10 bg-[#e3f0af] m-10">
        <div>
          <CreateTodo fetchTodo={fetchTodo} />
        </div>
        <div className="border-2 rounded-3xl p-2 bg-[#F0BB78] h-[450px] max-h-[450px] overflow-y-auto">
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
