const { addTask, normalizeText } = require("./app.logic.cjs");

test("normalizeText trims and collapses spaces", () => {
  expect(normalizeText("  Hello  world  ")).toBe("Hello world");
});

test("addTask adds a task with normalized text and completed=false", () => {
  const prev = [];
  const next = addTask(prev, "  Buy  milk  ");
  expect(next).toHaveLength(1);
  expect(next[0]).toMatchObject({ text: "Buy milk", completed: false });
});

test("addTask ignores empty input", () => {
  const prev = [{ id: "x", text: "Existing", completed: false }];
  const next = addTask(prev, "  ");
  expect(next).toEqual(prev);
});
