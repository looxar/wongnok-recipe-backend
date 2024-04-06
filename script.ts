import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // const level = await prisma.level.create({
    //   data: {
    //     id: 1,
    //     level_name: "ง่าย",
    //   },
    // })
    // const Level = await prisma.level.findMany()
    const Recipe = await prisma.recipe.create({
        data: {
          id:   1,
          name: 'กะเพราหมูสับ',
          img: 'pathToPic',
          raw_material: "ใบกะเพรา+หมูสับ+กระเทียม",
          step: "วิธีทำ123",
          duration: "10นาที",
          difficult: {
            connect: { id: 1 }
          },
        },
      })
    console.log(Recipe)
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