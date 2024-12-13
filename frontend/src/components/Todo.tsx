function Todo(props: {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  __v: number;
  fetchTodo: () => void;
}) {
  async function handleCheckBox() {
    try {
      const myHeader = new Headers();
      myHeader.append("id", "0");
      myHeader.append("Content-type", "application/json");
      const myBody = JSON.stringify({
        title: props.title,
        description: props.description,
        completed: !props.completed,
      });
      const fetchData = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}todos/update-todo/${props._id}`,
        {
          method: "PUT",
          headers: myHeader,
          body: myBody,
        }
      );
      const data = await fetchData.json();
      console.log(data.message);
      props.fetchTodo();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleDelete() {
    try {
      const myHeader = new Headers();
      myHeader.append("id", "0");
      const fetchData = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}todos/delete-todo/${props._id}`,
        {
          method: "DELETE",
          headers: myHeader,
        }
      );
      const data = await fetchData.json();
      console.log(data.message);
      props.fetchTodo();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleUpdate() {
    try {
      const title = prompt("Title", props.title);
      const description = prompt("Description", props.description);
      if (title != null && description != null) {
        if (
          title.trim() != props.title &&
          description.trim() != props.description
        ) {
          const myHeader = new Headers();
          myHeader.append("id", "0");
          myHeader.append("Content-type", "application/json");
          const myBody = JSON.stringify({
            title: title,
            description: description,
          });
          const fetchData = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}todos/update-todo/${props._id}`,
            { method: "PUT", headers: myHeader, body: myBody }
          );
          const data = await fetchData.json();
          console.log(data.message);
          props.fetchTodo();
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div className="rounded-3xl p-3 bg-[#FBF6E9] my-2 flex flex-row">
      <div className="w-[600px]">
        <div className="text-xl font-bol">{props.title}</div>
        <div className="text-gray-500	">{props.description}</div>
      </div>
      <div className="flex flex-col">
        <button
          onClick={handleUpdate}
          className="bg-[#C3E5D8] rounded-3xl p-2 mb-2"
        >
          ✏️
        </button>
        <button
          onClick={handleDelete}
          className="bg-[#5DADD9] rounded-3xl p-2 mb-2"
        >
          🗑️
        </button>
        <input
          className="h-6 p-2"
          onChange={() => {
            handleCheckBox();
          }}
          type="checkbox"
          checked={props.completed}
        />
      </div>
    </div>
  );
}

export default Todo;
