import { useState } from "react";

interface TodoProps {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  __v: number;
}

function CreateTodo(props: {
  todos: Array<TodoProps>;
  setTodos: (a: Array<TodoProps>) => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  function handleChange(): void {
    const titleElement = document.getElementById(
      "title"
    ) as HTMLInputElement | null;
    const descriptionElement = document.getElementById(
      "description"
    ) as HTMLTextAreaElement | null;
    if (titleElement && descriptionElement) {
      setTitle(titleElement.value);
      setDescription(descriptionElement.value);
    }
  }

  async function uploadTodo(): Promise<void> {
    if (title.trim() != "" || description.trim() != "") {
      try {
        const data = JSON.stringify({
          title: title,
          description: description,
        });
        console.log(data);
        const myHeader = new Headers();
        myHeader.append("id", "0");
        myHeader.append("Content-type", "application/json; charset=UTF-8");
        const fetchData = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}todos/create-todo`,
          {
            method: "POST",
            body: data,
            headers: myHeader,
          }
        );

        const result = await fetchData.json();
        const x = await result.data;
        props.setTodos([
          ...props.todos,
          {
            _id: x._id,
            title: x.title,
            description: x.description,
            completed: x.completed,
            __v: x.__v,
          },
        ]);

        console.log("here");
        console.log(props.todos);
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      alert("Fill The title and description both");
    }
  }

  return (
    <div>
      <div>
        <input
          id="title"
          type="text"
          placeholder="Title"
          onChange={handleChange}
        />
        <button
          onClick={() => {
            const titleElement = document.getElementById(
              "title"
            ) as HTMLInputElement | null;
            if (titleElement) {
              titleElement.value = "";
            }
          }}
        >
          ❎
        </button>
        <textarea
          id="description"
          placeholder="Description"
          onChange={handleChange}
        ></textarea>
        <button
          onClick={() => {
            const descriptionElement = document.getElementById(
              "description"
            ) as HTMLTextAreaElement | null;
            if (descriptionElement) {
              descriptionElement.value = "";
            }
          }}
        >
          ❎
        </button>
      </div>
      <div>
        <button onClick={uploadTodo}>Create✅</button>
      </div>
    </div>
  );
}

export default CreateTodo;
