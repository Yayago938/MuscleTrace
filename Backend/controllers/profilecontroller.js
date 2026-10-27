const { z } = require("zod");
const prisma = require("../utils/prisma");

const profileSchema = z.object({
  weight: z.number().min(20).max(500),
  height: z.number().positive().max(300),
  dateOfBirth: z.coerce.date(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
}).superRefine((profile, context) => {
  const age = (Date.now() - profile.dateOfBirth.getTime()) / 31557600000;
  if (age < 13 || age > 120) context.addIssue({ code: "custom", path: ["dateOfBirth"], message: "Enter a date of birth for an age between 13 and 120" });
  if (profile.height < 50) context.addIssue({ code: "custom", path: ["height"], message: "Height must be at least 50 cm" });
});

function serializeProfile(user) {
  const { name, weight, height, dateOfBirth, gender, profileCompleted } = user;

  return {
    name: name || "Member",
    weight,
    height,
    dateOfBirth,
    gender,
    profileCompleted: Boolean(profileCompleted),
  };
}

async function getProfile(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { name: true, weight: true, height: true, dateOfBirth: true, gender: true, profileCompleted: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(serializeProfile(user));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
}

async function updateProfile(req, res) {
  const result = profileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { ...result.data, profileCompleted: true },
      select: { name: true, weight: true, height: true, dateOfBirth: true, gender: true, profileCompleted: true },
    });

    res.json(serializeProfile(user));
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
}

module.exports = { getProfile, updateProfile };
