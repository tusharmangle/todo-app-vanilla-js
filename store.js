const store = {
  todos: [
    {
      id: "1",
      title: "Read the text",
      completed: false,
    },
    {
      id: "2",
      title: "Make a tea",
      completed: true,
    },
    {
      id: "3",
      title: "play cricket",
      completed: false,
    },
  ],
  user: {
    name: "Tushar",
  },
};

const storeHandler = {
  get(target, property) {
    return target[property];
  },
  set(target, property, value) {
    target[property] = value;
    if (property == "todos") {
      window.dispatchEvent(new Event("todosChanged"));
    }
    localStorage.setItem("store", JSON.stringify(store));
    return true;
  },
};

const storeProxy = new Proxy(store, storeHandler);

function addTodo(newTodo) {
  storeProxy.todos = [...storeProxy.todos, newTodo];
}

function removeTodo(todoId) {
  const filtered = storeProxy.todos.filter((todo) => todo.id !== todoId);
  storeProxy.todos = filtered;
}

function toggleTodo(id, completed) {
  storeProxy.todos = storeProxy.todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: completed };
    } else {
      return todo;
    }
  });
}
export { addTodo, removeTodo, toggleTodo };
export default storeProxy;

// write function to add two number
