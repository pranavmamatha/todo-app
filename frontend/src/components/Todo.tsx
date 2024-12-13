function Todo(props: {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  __v: number;
  fetchTodo: () => void;
}) {
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.description}</div>
      <div>
        <button>✏️</button>
        <button></button>
        <input onClick={() => {}} type="checkbox" checked={props.completed} />
      </div>
    </div>
  );
}

export default Todo;
