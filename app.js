import render from "./render.js";
import store from "./store.js";
import { addTodo, removeTodo, toggleTodo } from "./store.js";

window.addEventListener("todosChanged", () => {
  render();
});

const storeFromLocalStorage = JSON.parse(localStorage.getItem("store"));
console.log(storeFromLocalStorage);
if (storeFromLocalStorage?.todos.length) {
  store.todos = storeFromLocalStorage.todos;
}
render();

const form = document.querySelector("#form");
const input = document.querySelector(".todo-title-input");
const btn = document.querySelector(".todo-form-button");
const todos = document.querySelector(".todos");

const inputHandler = (e) => {
  e.preventDefault();
  const newTodo = {
    id: crypto.randomUUID(),
    title: input.value,
    completed: false,
  };
  addTodo(newTodo);
  input.value = "";
};

form.addEventListener("submit", inputHandler);
btn.addEventListener("click", inputHandler);

todos.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-todo-button")) {
    const id = e.target.closest("li").dataset.id;
    removeTodo(id);
  }
});

todos.addEventListener("change", (e) => {
  const target = e.target;
  if (target.classList.contains("todo-checkbox")) {
    const id = target.closest("li").dataset.id;
    const completed = target.checked;
    toggleTodo(id, completed);
    console.log(localStorage.getItem("store"));
  }
});
