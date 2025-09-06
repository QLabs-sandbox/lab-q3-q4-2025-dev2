const form = document.getElementById("form");
const input = document.getElementById("task-input");
const ul = document.getElementById("task-list");
const statusEl = document.getElementById("status");
const errorEl = document.getElementById("form-error");

const STORAGE_KEY = "todo.tasks.v1";

let tasks = loadTasks();
renderAll(tasks);

form.addEventListener("submit", (event) => {
  if (errorEl.textContent) clearError();
  event.preventDefault();
  const raw = input.value;
  const text = normalizeText(raw);
  if (!text) {
    showError("Please enter a task.");
    return;
  }
  if (isDuplicate(text, tasks)) {
    showError("This task already exists.");
    return;
  }
  clearError();
  input.removeAttribute("aria-invalid");

  const id = genId();
  const task = { id, text, completed: false };

  tasks = [...tasks, task];
  saveTasks(tasks);

  ul.appendChild(createItem(task));
  announce(`Task “${text}” added.`);
  input.value = "";
  input.focus();
});

function createItem(task) {
  const li = document.createElement("li");

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.id = task.id;
  cb.checked = !!task.completed;

  const label = document.createElement("label");
  label.htmlFor = task.id;
  label.textContent = task.text;

  cb.addEventListener("change", () => {
    li.classList.toggle("completed", cb.checked);
    tasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: cb.checked } : t
    );
    saveTasks(tasks);
    announce(
      `Task “${task.text}” ${
        cb.checked ? "completed" : "marked as not completed"
      }.`
    );
  });

  const del = document.createElement("button");
  del.type = "button";
  del.className = "delete-btn";
  del.textContent = "Delete";
  del.setAttribute("aria-label", `Delete task "${task.text}"`);

  del.addEventListener("click", () => {
    li.remove();
    tasks = tasks.filter((t) => t.id !== task.id);
    saveTasks(tasks);
    announce(`Task “${task.text}” deleted.`);
    input.focus();
  });

  li.classList.toggle("completed", !!task.completed);
  li.append(cb, label, del);
  return li;
}

function renderAll(list) {
  ul.replaceChildren(...list.map(createItem));
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    announce("Saving failed. Check storage permissions or quota.");
  }
}

function announce(message) {
  statusEl.textContent = "";
  setTimeout(() => {
    statusEl.textContent = message;
  }, 1000);
}

function normalizeText(text) {
  return text.trim().replace(/\s+/g, " ");
}

function isDuplicate(text, list) {
  return list.some((t) => t.text.toLowerCase() === text.toLowerCase());
}

function genId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function showError(msg) {
  input.setAttribute("aria-invalid", "true");
  errorEl.textContent = msg;
}

function clearError() {
  input.removeAttribute("aria-invalid");
  errorEl.textContent = "";
}
