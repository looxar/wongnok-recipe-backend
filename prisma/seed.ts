import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const easyLevel = await prisma.level.upsert({
        where: { id: 1 },
        update: {},
        create: {
          id: 1,
          level_name: "Easy",
        },
      })
      const mediumLevel = await prisma.level.upsert({
        where: { id: 2 },
        update: {},
        create: {
          id: 2,
          level_name: "Medium",
        },
      })
      const hardLevel = await prisma.level.upsert({
        where: { id: 3 },
        update: {},
        create: {
          id: 3,
          level_name: "Hard",
        },
      })
      const duration1 = await prisma.duration.upsert({
        where: { id: 1 },
        update: {},
        create: {
          id: 1,
          time_start: 5,
          time_end: 10,
        },
      })
      const duration2 = await prisma.duration.upsert({
        where: { id: 2 },
        update: {},
        create: {
          id: 2,
          time_start: 11,
          time_end: 30,
        },
      })
      const duration3 = await prisma.duration.upsert({
        where: { id: 3 },
        update: {},
        create: {
          id: 3,
          time_start: 31,
          time_end: 60,
        },
      })
      const duration4 = await prisma.duration.upsert({
        where: { id: 4 },
        update: {},
        create: {
          id: 4,
          time_start: 61,
          time_end: 9999,
        },
      })
 
  console.log({ easyLevel, mediumLevel, hardLevel, duration1, duration2, duration3, duration4 })
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