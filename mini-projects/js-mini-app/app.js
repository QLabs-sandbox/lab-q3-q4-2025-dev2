const form = document.getElementById("form");
const input = document.getElementById("task-input");
const ul = document.getElementById("task-list");
const statusEl = document.getElementById("status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskText = input.value.trim();
  if (!taskText) return;

  ul.appendChild(createItem(taskText));
  announce(`Task “${taskText}” added.`);
  input.value = "";
  input.focus();
});

function createItem(text) {
  const li = document.createElement("li");

  const uid =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.id = uid;

  const label = document.createElement("label");
  label.htmlFor = uid;
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
  del.textContent = "Delete";
  del.setAttribute("aria-label", `Delete task "${text}"`);

  del.addEventListener("click", () => {
    li.remove();
    announce(`Task “${text}” deleted.`);
    input.focus();
  });

  li.append(cb, label, del);
  return li;
}

function announce(message) {
  statusEl.textContent = "";
  setTimeout(() => {
    statusEl.textContent = message;
  }, 0);
}
