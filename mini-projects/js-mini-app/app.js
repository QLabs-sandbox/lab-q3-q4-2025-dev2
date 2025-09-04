const form = document.getElementById("form");
const input = document.getElementById("task-input");
const ul = document.getElementById("task-list");
const statusEl = document.getElementById("status");

let idCounter = 0;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskText = input.value.trim();
  if (!taskText) return;

  // const li = document.createElement("li");
  // li.textContent = taskText;
  // ul.appendChild(li);

  // statusEl.textContent = `Task “${taskText}” added.`;
  // input.value = "";
  // input.focus();

  ul.appendChild(createItem(taskText));
  announce(`Task “${taskText}” added.`);
  input.value = "";
  input.focus();
});

function createItem(text) {
  const li = document.createElement("li");

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.id = `task-${++idCounter}`;

  const label = document.createElement("label");
  label.htmlFor = cb.id;
  label.textContent = text;

  cb.addEventListener("change", () => {
    li.classList.toggle("completed", cb.checked);
    announce(
      `Task “${text}” ${cb.checked ? "completed" : "marked as not completed"}.`
    );
  });

  const del = document.createElement("button");
  del.type = "button";
  del.className = "delete-btn";
  del.innerHTML = `Delete <span class="sr-only">task “${text}”</span>`;
  del.addEventListener("click", () => {
    li.remove();
    announce(`Task “${text}” deleted.`);
    input.focus();
  });

  li.append(cb, label, del);
  return li;
}

function announce(message) {
  statusEl.textContent = message;
}
