import store from "./store.js";

// function render() {
//   return new Promise((resolve, reject) => {
//     if (store) {
//       return resolve(store.todos);
//     } else {
//       reject("Something Went Wrong");
//     }
//   });
// }

async function render() {
  if (store.todos) {
    const todos = await store.todos;
    const todosContainer = document.querySelector(".todos");
    const todosElements = todos
      .map(
        (todo) =>
          `
        <li class='todo' data-id='${todo.id}'><span class="todo-title ${
            todo.completed ? "completed" : ""
          }">${todo.title}</span>
          <div class="toggle-delete">
          <input type="checkbox" name="completed" class="todo-checkbox" ${
            todo.completed ? "checked" : ""
          } />
          <button class="delete-todo-button">x</button>
          </div>
        </li>
        `
      )
      .join("");
    todosContainer.innerHTML = todosElements;
  } else {
    throw new Error("No todos found");
  }
}

export default render;
