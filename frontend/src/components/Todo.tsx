interface TodoProps {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

function Todo({ title, description, completed }: TodoProps) {
  return (
    <div>
      <div>
        <div>{title}</div>
        <div>{description}</div>
      </div>
      <div>
        <button>Edit✒️</button>
        <button>Complete✔️</button>
      </div>
    </div>
  );
}

export default Todo;
