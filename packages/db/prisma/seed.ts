import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "user@ufromail.cl" },
    update: {},
    create: {
      email: "user@ufromail.cl",
      name: "UserName",
      password: "pass"
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
