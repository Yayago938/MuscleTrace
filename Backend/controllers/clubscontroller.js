const { z } = require("zod");
const prisma = require("../utils/prisma");
const { parseId, parsePagination, paged } = require("../utils/validation");

const clubSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().max(500),
});

function clubData(club) {
  return {
    id: club.id,
    name: club.name,
    description: club.description,
    createdAt: club.createdAt,
    memberCount: club._count.members,
    isMember: club.members.length > 0,
  };
}

const clubInclude = (userId) => ({
  _count: { select: { members: true } },
  members: { where: { userId }, select: { role: true } },
});

async function createClub(req, res) {
  const parsed = clubSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });

  const data = { ...parsed.data, nameKey: parsed.data.name.toLocaleLowerCase() };
  try {
    const club = await prisma.$transaction(async (tx) => {
      const created = await tx.club.create({ data: { ...data, createdById: req.userId } });
      await tx.clubMember.create({ data: { clubId: created.id, userId: req.userId, role: "OWNER" } });
      return created;
    });
    res.status(201).json({ id: club.id, name: club.name, description: club.description, role: "OWNER", memberCount: 1, isMember: true });
  } catch (error) {
    if (error.code === "P2002") return res.status(409).json({ error: "A club with this name already exists" });
    res.status(500).json({ error: "Failed to create club" });
  }
}

async function listClubs(req, res) {
  const pagination = parsePagination(req.query);
  if (!pagination) return res.status(400).json({ error: "Invalid pagination" });
  const query = typeof req.query.q === "string" ? req.query.q.trim().slice(0, 80).toLocaleLowerCase() : "";

  try {
    const clubs = await prisma.club.findMany({
      where: query ? { nameKey: { contains: query } } : {},
      include: clubInclude(req.userId),
      orderBy: { createdAt: "desc" },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });
    res.json(paged(clubs.map(clubData), pagination.page, pagination.limit));
  } catch {
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
}

async function myClubs(req, res) {
  try {
    const memberships = await prisma.clubMember.findMany({
      where: { userId: req.userId },
      include: { club: { include: { _count: { select: { members: true } } } } },
      orderBy: { joinedAt: "desc" },
    });
    res.json({ items: memberships.map(({ club, role }) => ({ id: club.id, name: club.name, description: club.description, createdAt: club.createdAt, memberCount: club._count.members, isMember: true, role })) });
  } catch {
    res.status(500).json({ error: "Failed to fetch your clubs" });
  }
}

async function joinClub(req, res) {
  const id = parseId(req.params.id);
  if (!id.success) return res.status(400).json({ error: "Invalid club ID" });
  try {
    const club = await prisma.club.findUnique({ where: { id: id.data }, select: { id: true } });
    if (!club) return res.status(404).json({ error: "Club not found" });
    await prisma.clubMember.upsert({ where: { clubId_userId: { clubId: id.data, userId: req.userId } }, create: { clubId: id.data, userId: req.userId }, update: {} });
    res.json({ joined: true });
  } catch {
    res.status(500).json({ error: "Failed to join club" });
  }
}

async function leaveClub(req, res) {
  const id = parseId(req.params.id);
  if (!id.success) return res.status(400).json({ error: "Invalid club ID" });
  try {
    const membership = await prisma.clubMember.findUnique({
      where: { clubId_userId: { clubId: id.data, userId: req.userId } },
      include: { club: { select: { _count: { select: { members: true } } } } },
    });
    if (!membership) return res.json({ left: false });
    if (membership.role === "OWNER" && membership.club._count.members > 1) return res.status(409).json({ error: "Transfer ownership before leaving a club with other members" });
    await prisma.$transaction(async (tx) => {
      if (membership.role === "OWNER") await tx.club.delete({ where: { id: id.data } });
      else await tx.clubMember.delete({ where: { clubId_userId: { clubId: id.data, userId: req.userId } } });
    });
    res.json({ left: true });
  } catch {
    res.status(500).json({ error: "Failed to leave club" });
  }
}

module.exports = { createClub, listClubs, myClubs, joinClub, leaveClub };
