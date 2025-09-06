function normalizeText(text) {
  return text.trim().replace(/\s+/g, " ");
}

function addTask(list, rawText, id = "id-1") {
  const text = normalizeText(rawText);
  if (!text) return list;
  return [...list, { id, text, completed: false }];
}

module.exports = { addTask, normalizeText };
