const form = document.getElementById("task-form");
const text = document.getElementById("todo-input");
const body = document.getElementById("body");
const numberOfTask = document.querySelector(".items-left");
const getActive = document.querySelector(".get-active");
const getComplete = document.querySelector(".get-complete");
const getAllTodo = document.querySelector(".active");
const clear = document.querySelector(".clear");

const createEventListeners = () => {
  let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
  todoCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener("click", () => {
      markComplete(checkMark.dataset.id);
      // console.log(checkMark.dataset.id);
    });
  });
};

const generateItems = (items) => {
  let itemsHTML = "";

  items.forEach((item) => {
    itemsHTML += `
        <div class="todo-item">
          <div class="check">
            <div data-id="${item.id}" class="check-mark ${
      item.active == false ? "checked" : ""
    }"
    }>
               <img src="./images/icon-check.svg" alt="icon-check" />
            </div>
          </div>
          <div class="todo-text ${item.active == false ? "checked" : ""}">${
      item.text
    }</div>
        </div>
    `;
  });

  document.querySelector(".todo-items").innerHTML = itemsHTML;
  createEventListeners();
};

const countItems = (items) => {
  numberOfTask.textContent = `${items.length} Items left`;
};

const getItemsDb = () => {
  const data = localStorage.getItem("todos");

  if (data === null) {
    localStorage.setItem("todos", JSON.stringify([]));
    return;
  } else {
    const todos = JSON.parse(data);
    const active = todos.filter((todo) => {
      if (todo.active) {
        return todo;
      }
    });

    generateItems(todos);
    countItems(active);
  }
};

window.onload = getItemsDb();

const submitData = (data) => {
  const todos = JSON.parse(localStorage.getItem("todos"));

  const newTodo = {
    id: new Date().getTime(),
    active: true,
    text: data,
  };

  localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
};

// send form data

form.addEventListener("submit", (e) => {
  e.preventDefault();

  submitData(text.value);

  text.value = "";

  getItemsDb();
});

// ----------------------- generate Items section

const markComplete = (id) => {
  const data = localStorage.getItem("todos");
  const todos = JSON.parse(data);

  const update = todos.map((todo) => {
    return todo.id == id ? { ...todo, active: !todo.active } : todo;
  });

  localStorage.setItem("todos", JSON.stringify(update));
  getItemsDb();
};

const getTodoActive = () => {
  const data = localStorage.getItem("todos");
  const todos = JSON.parse(data);

  const actived = todos.filter((todo) => {
    if (todo.active) {
      return todo;
    }
  });

  generateItems(actived);
};

getActive.addEventListener("click", () => {
  getActive.classList.add("clicked");
  getComplete.classList.remove("clicked");
  getAllTodo.classList.remove("clicked");

  getTodoActive();
});

const getTodoCompleted = () => {
  const data = localStorage.getItem("todos");
  const todos = JSON.parse(data);

  const completed = todos.filter((todo) => {
    if (!todo.active) {
      return todo;
    }
  });
  generateItems(completed);
};

getComplete.addEventListener("click", () => {
  getComplete.classList.add("clicked");
  getActive.classList.remove("clicked");
  getAllTodo.classList.remove("clicked");
  getTodoCompleted();
});

const getAllTodoItems = () => {
  const data = localStorage.getItem("todos");
  const todos = JSON.parse(data);

  generateItems(todos);
};

getAllTodo.addEventListener("click", () => {
  getAllTodo.classList.add("clicked");
  getActive.classList.remove("clicked");
  getComplete.classList.remove("clicked");
  getAllTodoItems();
});

const clearCompleted = () => {
  const data = localStorage.getItem("todos");
  const todos = JSON.parse(data);

  const completed = todos.filter((todo) => {
    if (todo.active) {
      return todo;
    }
  });

  localStorage.setItem("todos", JSON.stringify(completed));
  generateItems(completed);
  countItems(completed);
};

clear.addEventListener("click", () => {
  clearCompleted();
});
