import { useState } from "react";

function CreateTodo() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div>
      <div>
        <input type="text" />
        <button>❎</button>
        <textarea name="" id=""></textarea>
        <button>❎</button>
      </div>
      <div>
        <button>Create✅</button>
      </div>
    </div>
  );
}

export default CreateTodo;
