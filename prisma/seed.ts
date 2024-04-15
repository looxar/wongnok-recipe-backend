import { PrismaClient } from "@prisma/client";
import { serialize } from "v8";
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync(10);
// // Generate salt and hash the password
// const saltRounds = 10; // Number of salt rounds (recommended value)
// const salt = bcrypt.genSaltSync(saltRounds);
// const hashedPassword = bcrypt.hashSync(password, salt);

async function main() {
  const easyLevel = await prisma.level.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      level_name: "Easy",
    },
  });
  const mediumLevel = await prisma.level.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      level_name: "Medium",
    },
  });
  const hardLevel = await prisma.level.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      level_name: "Hard",
    },
  });
  const duration1 = await prisma.duration.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      time_start: 5,
      time_end: 10,
    },
  });
  const duration2 = await prisma.duration.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      time_start: 11,
      time_end: 30,
    },
  });
  const duration3 = await prisma.duration.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      time_start: 31,
      time_end: 60,
    },
  });
  const duration4 = await prisma.duration.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      time_start: 61,
      time_end: 9999,
    },
  });

  const user1 = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      user_name: "looxar",
      email: "looxar.wicher@gmail.com",
      password: bcrypt.hashSync("wongnok@2024", salt), // Store the hashed password in the database
      salt: salt,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      user_name: "panuwit",
      email: "panuwit.tha@pea.co.th",
      password: bcrypt.hashSync("wongnok@2024", salt), // Store the hashed password in the database
      salt: salt,
    },
  });

  const menu1 = await prisma.recipe.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      menu_name: "กะเพราหมูสับ",
      pathimg: "pathToPic",
      raw_material: "ใบกะเพรา+หมูสับ+กระเทียม",
      step: "วิธีทำ123",
      durationId: 1, // Use the foreign key field instead of `duration`
      levelId: 1,    // Use the foreign key field instead of `difficult`
      userId: 1,     // Use the foreign key field instead of `user`
    },
  });

  const menu2 = await prisma.recipe.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      menu_name: "แกงจืดเต้าหู้หมูสับ",
      pathimg: "pathToPic",
      raw_material: "ใบตำลึง+เต้าหู้+หมูสับ",
      step: "วิธีทำ456",
      durationId: 2, // Use the foreign key field instead of `duration`
      levelId: 2,    // Use the foreign key field instead of `difficult`
      userId: 2,     // Use the foreign key field instead of `user`
    },
  });

  const menu3 = await prisma.recipe.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      menu_name: "ต้มหมูพะโล้",
      pathimg: "pathToPic",
      raw_material: "เนื้อหมู+เครื่องพะโล้+ไข่",
      step: "วิธีทำ789",
      durationId: 4,
      levelId: 3,
      userId: 1,
    },
  });

  const menu4 = await prisma.recipe.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      menu_name: "ต้มแซบกระดูกอ่อน",
      pathimg: "pathToPic",
      raw_material: "กระดูกอ่อนหมู่+เครื่องต้มยำ+ขิงข่าตะไคร้",
      step: "วิธีทำ789",
      durationId: 3, // Use the foreign key field instead of `duration`
      levelId: 3,    // Use the foreign key field instead of `difficult`
      userId: 2,     // Use the foreign key field instead of `user`
    },
  });

  console.log({
    easyLevel,
    mediumLevel,
    hardLevel,
    duration1,
    duration2,
    duration3,
    duration4,
    user1,
    user2,
    menu1,
    menu2,
    menu3,
    menu4
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
