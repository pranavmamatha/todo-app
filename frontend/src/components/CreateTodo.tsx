function CreateTodo(props: { fetchTodo: () => void }) {
  async function handleClick() {
    const titleElement = (document.getElementById("title") as HTMLInputElement)
      .value;
    const descriptionElement = (
      document.getElementById("description") as HTMLTextAreaElement
    ).value;
    if (titleElement != "" && descriptionElement != "") {
      const body = JSON.stringify({
        title: titleElement,
        description: descriptionElement,
      });
      const myHeader = new Headers();
      myHeader.append("id", "0");
      myHeader.append("Accept", "application/json");
      myHeader.append("Content-Type", "application/json");
      const fetchData = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}todos/create-todo`,
        { method: "POST", headers: myHeader, body: body }
      );
      const data = await fetchData.json();
      console.log(data.message);
      (document.getElementById("title") as HTMLInputElement).value = "";
      (document.getElementById("description") as HTMLTextAreaElement).value =
        "";
      props.fetchTodo();
    } else {
      alert("Title or description is empty");
    }
  }

  return (
    <div>
      <div>
        <input id="title" type="text" placeholder="title" />
        <button
          onClick={() => {
            const titleElement = document.getElementById(
              "title"
            ) as HTMLInputElement;
            if (titleElement) {
              titleElement.value = "";
            }
          }}
        >
          ❌
        </button>
      </div>
      <div>
        <textarea id="description" placeholder="description"></textarea>
        <button
          onClick={() => {
            const descriptionELement = document.getElementById(
              "description"
            ) as HTMLTextAreaElement;
            if (descriptionELement) {
              descriptionELement.value = "";
            }
          }}
        >
          ❌
        </button>
      </div>
      <div>
        <button onClick={handleClick}>Create✅</button>
      </div>
    </div>
  );
}

export default CreateTodo;
