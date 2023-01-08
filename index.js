const navbar = document.querySelector(".navbar");

// Random Background
const randomBackGroundButton = document.querySelector(
  ".random-background-button"
);
const images = ["1.png", "2.png", "3.png"];
let index = null;

function changeRandomImage() {
  const newIndex = Math.floor(Math.random() * images.length);

  if (index === newIndex) {
    changeRandomImage();
  } else {
    index = newIndex;
    const randomImage = images[index];
    document.body.style.backgroundImage = `url(img/${randomImage})`;
  }
}

changeRandomImage();
randomBackGroundButton.addEventListener("click", changeRandomImage);

// Weather
const weather = document.querySelector(".weather-section");
const API_KEY = "29fad2dad33c72a1e610d42a9b29e2ac";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = data.name;
      const curWeather = data.weather[0].main;

      weather.children[0].innerText = `${city} is ${curWeather}`;
    })
    .catch((error) => {
      console.log(error);
    });
}

function onGeoError() {
  alert("Can't find you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// login
const account = document.querySelector(".account-section");
const logInForm = document.querySelector(".login-form");
const logInUserName = document.querySelector(".login-username");
const accountButton = document.querySelector(".account-button");

const USERNAME_KEY = "username";

const savedUser = JSON.parse(localStorage.getItem(USERNAME_KEY));

function saveUser(username) {
  logInForm.classList.add("active");
  logInUserName.classList.remove("active");
  localStorage.setItem(USERNAME_KEY, username);
  logInUserName.innerText = username;
}

function LogOut() {
  logInForm.classList.remove("active");
  logInUserName.classList.add("active");
  localStorage.setItem(USERNAME_KEY, null);
  logInUserName.innerText = "";
}

if (savedUser !== null) {
  saveUser(savedUser);
}

function handleLogIn(event) {
  event.preventDefault();
  const username = document.querySelector(".username").value;

  saveUser(username);
}

function handleLogOut() {
  let text = "Do you want to log out?";
  if (confirm(text) == true) {
    logInForm.classList.remove("active");
    logInUserName.classList.add("active");
    localStorage.setItem(USERNAME_KEY, null);
    logInUserName.innerText = "";
  }
}

accountButton.addEventListener("click", handleLogIn);
logInUserName.addEventListener("click", handleLogOut);

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
  buttonTag.className = "delete-button";
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
  const hour = String(nowTime.getHours()).padStart(2, "0");
  const minute = String(nowTime.getMinutes()).padStart(2, "0");
  const second = String(nowTime.getSeconds()).padStart(2, "0");

  time.innerText = `${hour}:${minute}:${second}`;
}

timer();

setInterval(timer, 1000);
