import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"
const prisma = new PrismaClient();
import bcrypt from "bcrypt"

async function main() {
  const hash = await bcrypt.hash("pass", 10)
  const { id: userId } = await prisma.user.upsert({
    where: { email: "user@ufromail.cl" },
    update: {
    },
    create: {
      email: "user@ufromail.cl",
      name: "UserName",
      password: hash,
    }
  })
  await prisma.bike.create({
    data: {
      userId,
      code: nanoid(10),
      description: "Oxford"
    }
  })
  await prisma.bike.create({
    data: {
      userId,
      code: nanoid(10),
      description: "Marlin"
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
