const { z } = require("zod");

const idSchema = z.string().uuid();

function parseId(value) {
  return idSchema.safeParse(value);
}

function parsePagination(query) {
  const result = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  }).safeParse(query);

  return result.success ? result.data : null;
}

function paged(items, page, limit) {
  return { items, page, limit, hasMore: items.length === limit };
}

module.exports = { parseId, parsePagination, paged };
