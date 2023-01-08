const navbar = document.querySelector(".navbar");

// Weather
const weather = document.querySelector(".weather-section");

function onGeoOk(position) {
  console.log(position);
}

function onGeoError() {
  alert("Can't find you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

const account = document.querySelector(".account-section");
const accountButton = document.querySelector(".account-button");

const main = document.querySelector("main");

// Todo
const todo = document.querySelector(".todo");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
let todos = [];
const TODOS_KEY = "todos";

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const liTag = event.target.parentElement;
  liTag.remove();

  todos = todos.filter((todo) => todo.id !== parseInt(liTag.id));
  saveTodos();
}

function paintTodo(newTodoObj) {
  const liTag = document.createElement("li");

  liTag.id = newTodoObj.id;

  const spanTag = document.createElement("span");
  spanTag.innerText = newTodoObj.todo;

  const buttonTag = document.createElement("button");
  buttonTag.className = "delete-button"
  buttonTag.innerText = "❌";
  buttonTag.addEventListener("click", deleteTodo);

  liTag.appendChild(spanTag);
  liTag.appendChild(buttonTag);

  todoList.appendChild(liTag);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    id: Date.now(),
    todo: newTodo,
  };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}

// Time
const footer = document.querySelector("footer");
const time = document.querySelector(".clock");

function timer() {
  const nowTime = new Date();
  const hour = nowTime.getHours();
  const minute = nowTime.getMinutes();
  const second = nowTime.getSeconds();

  time.innerText = `${hour}:${minute}:${second}`;
}

timer();

setInterval(timer, 1000);
