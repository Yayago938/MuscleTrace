const test = require("node:test");
const assert = require("node:assert/strict");
const { parseId, parsePagination } = require("../utils/validation");

test("accepts UUID route IDs and rejects malformed IDs", () => {
  assert.equal(parseId("b7c23b20-dfa1-48b5-9a43-b7497a60a101").success, true);
  assert.equal(parseId("not-an-id").success, false);
});

test("uses safe defaults and rejects invalid pagination", () => {
  assert.deepEqual(parsePagination({}), { page: 1, limit: 20 });
  assert.deepEqual(parsePagination({ page: "2", limit: "10" }), { page: 2, limit: 10 });
  assert.equal(parsePagination({ page: "0" }), null);
  assert.equal(parsePagination({ limit: "51" }), null);
});
