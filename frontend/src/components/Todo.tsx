function Todo(props: {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  __v: number;
  fetchTodo: () => void;
}) {
  async function handleClick(a: string) {
    const myHeader = new Headers();
    myHeader.append("id", "0");
    myHeader.append("Content-type", "application/json");
    const myBody = JSON.stringify({
      title: props.title,
      description: props.description,
      completed: a == "checkbox" ? !props.completed : props.completed,
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
  }
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.description}</div>
      <div>
        <button>✏️</button>
        <button></button>
        <input
          onChange={() => {
            handleClick("checkbox");
          }}
          type="checkbox"
          checked={props.completed}
        />
      </div>
    </div>
  );
}

export default Todo;
