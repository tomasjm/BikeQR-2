import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"
const prisma = new PrismaClient();

async function main() {
  const { id: userId } = await prisma.user.upsert({
    where: { email: "user@ufromail.cl" },
    update: {
    },
    create: {
      email: "user@ufromail.cl",
      name: "UserName",
      password: "pass",
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
