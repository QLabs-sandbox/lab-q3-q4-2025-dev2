const form = document.getElementById('form');
const input = document.getElementById('input');
const ul = document.getElementById('task-list');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    const li = document.createElement('li');
    li.textContent = taskText;
    ul.appendChild(li);
    input.value = '';
  }
});