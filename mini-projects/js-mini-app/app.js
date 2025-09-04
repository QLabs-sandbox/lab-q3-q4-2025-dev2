const form = document.getElementById("form");
const input = document.getElementById("task-input");
const ul = document.getElementById("task-list");
const statusEl = document.getElementById("status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskText = input.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.textContent = taskText;
  ul.appendChild(li);

  statusEl.textContent = `Task “${taskText}” added.`;
  input.value = "";
  input.focus();
});
