function CreateTodo(props: { fetchTodo: () => void }) {
  async function handleClick() {
    try {
      const titleElement = (
        document.getElementById("title") as HTMLInputElement
      ).value;
      const descriptionElement = (
        document.getElementById("description") as HTMLInputElement
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
        (document.getElementById("description") as HTMLInputElement).value = "";
        props.fetchTodo();
      } else {
        alert("Title or description is empty");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div>
      <div className="flex flex-row mb-2">
        <input
          id="title"
          type="text"
          placeholder="title"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          onClick={() => {
            const titleElement = document.getElementById(
              "title"
            ) as HTMLInputElement;
            if (titleElement) {
              titleElement.value = "";
            }
          }}
          className="bg-[#F5D1C8] rounded-3xl p-2"
        >
          ❌
        </button>
      </div>
      <div className="flex flex-row mb-2">
        <input
          id="description"
          placeholder="description"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <button
          onClick={() => {
            const descriptionELement = document.getElementById(
              "description"
            ) as HTMLInputElement;
            if (descriptionELement) {
              descriptionELement.value = "";
            }
          }}
          className="bg-[#F5D1C8] rounded-3xl p-2"
        >
          ❌
        </button>
      </div>
      <div>
        <button
          onClick={handleClick}
          className="bg-[#d1ffbd] w-30 rounded-3xl p-2 mb-2"
        >
          Create✅
        </button>
      </div>
    </div>
  );
}

export default CreateTodo;
