const { HashMap } = require("./hashmap");

test("Test: Put, getValue", () => {
  const map = new HashMap();

  map.put("value1", "key1");
  expect(map.getValue("key1")).toBe("value1");
});

test("Test: Clear", () => {
  const map = new HashMap();

  map.put("value1", "key1");
  map.put("value1", "key2");
  map.put("value1", "key3");
  map.put("value1", "key4");

  map.clear();
  expect(map.keys()).toEqual([]);
});

test("Test: contains", () => {
  const map = new HashMap();
  map.put("value1", "key1");
  expect(map.keys()).toContain("key1");
});

test("Test: isEmpty", () => {
  const map = new HashMap();
  expect(map.keys()).toEqual([]);
});

test("Test: keys", () => {
  const map = new HashMap();
  map.put("value1", "key1");
  map.put("value1", "key2");
  expect(map.keys()).toEqual(["key1", "key2"]);
});
test("Test: remove", () => {
  const map = new HashMap();
  map.put("value1", "key1");
  map.remove("key1");
  expect(map.keys()).toEqual([]);
});
test("Test: replace", () => {
  const map = new HashMap();
  map.put("value1", "key1");
  map.replace("value2", "key1");
  expect(map.getValue("key1")).toBe("value2");
});
test("Test: size", () => {
  const map = new HashMap();
  map.put("value1", "key1");
  map.put("value1", "key2");
  expect(map.size()).toBe(2);
});
