const { z } = require("zod");
const prisma = require("../utils/prisma");
const { parseId, parsePagination, paged } = require("../utils/validation");

const searchSchema = z.string().trim().min(2).max(80);
const publicUser = { id: true, name: true };

async function searchUsers(req, res) {
  const query = searchSchema.safeParse(req.query.q);
  const pagination = parsePagination(req.query);
  if (!query.success) return res.status(400).json({ error: "Search query must be at least 2 characters" });
  if (!pagination) return res.status(400).json({ error: "Invalid pagination" });

  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: req.userId },
        name: { contains: query.data, mode: "insensitive" },
        NOT: {
          OR: [
            { friends: { some: { friendId: req.userId } } },
            { friendOf: { some: { userId: req.userId } } },
          ],
        },
      },
      select: publicUser,
      orderBy: { name: "asc" },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });
    res.json(paged(users, pagination.page, pagination.limit));
  } catch {
    res.status(500).json({ error: "Failed to search users" });
  }
}

async function addFriend(req, res) {
  const id = parseId(req.params.id);
  if (!id.success) return res.status(400).json({ error: "Invalid friend ID" });
  if (id.data === req.userId) return res.status(400).json({ error: "You cannot add yourself" });

  try {
    const friend = await prisma.user.findUnique({ where: { id: id.data }, select: publicUser });
    if (!friend) return res.status(404).json({ error: "User not found" });

    await prisma.$transaction([
      prisma.friend.upsert({ where: { userId_friendId: { userId: req.userId, friendId: id.data } }, create: { userId: req.userId, friendId: id.data }, update: {} }),
      prisma.friend.upsert({ where: { userId_friendId: { userId: id.data, friendId: req.userId } }, create: { userId: id.data, friendId: req.userId }, update: {} }),
    ]);
    res.json({ friend });
  } catch {
    res.status(500).json({ error: "Failed to add friend" });
  }
}

async function getFriends(req, res) {
  const pagination = parsePagination(req.query);
  if (!pagination) return res.status(400).json({ error: "Invalid pagination" });

  try {
    const records = await prisma.friend.findMany({
      where: { userId: req.userId },
      select: { friend: { select: publicUser } },
      orderBy: { createdAt: "desc" },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });
    res.json(paged(records.map(({ friend }) => friend), pagination.page, pagination.limit));
  } catch {
    res.status(500).json({ error: "Failed to fetch friends" });
  }
}

async function removeFriend(req, res) {
  const id = parseId(req.params.id);
  if (!id.success) return res.status(400).json({ error: "Invalid friend ID" });

  try {
    const result = await prisma.$transaction((tx) => tx.friend.deleteMany({
      where: { OR: [{ userId: req.userId, friendId: id.data }, { userId: id.data, friendId: req.userId }] },
    }));
    res.json({ removed: result.count > 0 });
  } catch {
    res.status(500).json({ error: "Failed to remove friend" });
  }
}

module.exports = { searchUsers, addFriend, getFriends, removeFriend };
