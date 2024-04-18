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
      pathimg: "recipe_1713374638961.jpg",
      raw_material:
        "หมูสับ ใบกะเพรา พริกแดงจินดา 15 เม็ด กระเทียมไทยแกะเปลือก 2 ช้อนโต๊ะ ซอสหอยนางรม 3 ช้อนโต๊ะ ซอสปรุงรสฝาเขียว 1 ½ ช้อนโต๊ะ ซีอิ๊วดำ 1/2 ช้อนโต๊ะ น้ำปลา 1 ช้อนโต๊ะ น้ำตาลทราย 1/2 ช้อนชา",
      step: "1.ตำพริกแดงจินดาและกระเทียมให้ละเอียด 2.ตั้งกระทะ ใส่น้ำมันให้ร้อน แล้วใส่พริกแดงกับกระเทียมลงไป ผัดให้มีกลิ่นหอม 3.ใส่หมูสับลงไป ผัดให้หมูสับสุก 4.ปรุงรสด้วย ซอสหอยนางรม ซอสปรุงรสฝาเขียว น้ำปลา น้ำตาลทราย ลงไป ผัดให้ส่วนผสมทั้งหมดเข้ากัน 5.ใส่ใบกะเพราลงไป ผัดต่อไปอีกเล็กน้อย พอให้ใบกะเพราสลด เสร็จแล้ว ปิดเตา ตักเสิร์ฟใส่จาน เป็นอันเสร็จ",
      durationId: 1, // Use the foreign key field instead of `duration`
      levelId: 1, // Use the foreign key field instead of `difficult`
      userId: 1, // Use the foreign key field instead of `user`
    },
  });

  const menu2 = await prisma.recipe.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      menu_name: "แกงจืดเต้าหู้หมูสับ",
      pathimg: "recipe_1713374644222.jpg",
      raw_material:
        "หมูสับ300 กรัม เต้าหู้ไข่1 หลอด คนอร์ก้อน1 ก้อน กระเทียม1/2 หัว แครอทตามชอบ ผักกาดขาวตามชอบ คื่นฉ่ายตามชอบ พริกไทยขาวตามชอบ ซีอิ๊วขาว2 ช้อนชา น้ำปลา2 ช้อนชา",
      step: "1.ผสมหมูสับ พริกไทยป่น ซีอิ๊วขาว น้ำปลา คลุกเคล้าพอเข้ากัน 2.ต้มน้ำเปล่า ใส่กระเทียม คนอร์ก้อน พอเดือด ปั้นหมูสับที่หมักไว้เป็นก้อนกลมลงต้มพอสุก ใส่เกลือป่น คอยช้อนฟองออก 3.ปรุงรสด้วยน้ำปลา คนให้เข้ากัน ใส่ผักกาดขาว ใส่เต้าหู้ไข่ โรยด้วนคื่นฉ่าย 4.ตักใส่ชามโรยด้วยพริกไทย",
      durationId: 2, // Use the foreign key field instead of `duration`
      levelId: 2, // Use the foreign key field instead of `difficult`
      userId: 2, // Use the foreign key field instead of `user`
    },
  });

  const menu3 = await prisma.recipe.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      menu_name: "ต้มหมูพะโล้",
      pathimg: "recipe_1713374638555.jpg",
      raw_material:
        "หมูสามชั้น(หั่นชิ้นพอดีคำ)	400	กรัม ไข่ต้ม 5 ฟอง ผงพะโล้ 1	ช้อนโต๊ะ โป๊ยกั๊ก 6	ดอก อบเชย	2	แท่ง พริกไทยดำทุบ 1	ช้อนชา รากผักชีทุบ 2ิ ราก	กระเทียมทุบ 6	กลีบ ซีอิ๊วดำหวาน ตราภูเขาทอง  1	ช้อนชา	ซอสหอยนางรม ตราภูเขาทอง 2	ช้อนโต๊ะ ซอสปรุงรสฝาเขียว ตราภูเขาทอง 3	ช้อนโต๊ะ	เกลือ	1/2	ช้อนชา น้ำตาล	4	ช้อนโต๊ะ	น้ำเปล่า	1	ลิตร",
      step: "1.ต้มน้ำให้เดือด ใส่หมูสามชั้นที่หั่นแล้วลงไป 2.เติมรากผักชี พริกไทยดำ โป๊ยกั๊ก อบเชย ผงพะโล้ กระเทียม และไข่ต้มลงไป 3.ปิดฝาไว้พอเดือด ปรุงรสด้วยซีอิ๊วดำหวาน ตราภูเขาทอง ซอสหอยนางรม ตราภูเขาทอง     ซอสปรุงรสฝาเขียว ตราภูเขาทอง เกลือ และ น้ำตาล ตุ๋นด้วยไฟอ่อน 1 ชม. พร้อมเสิร์ฟ",
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
      pathimg: "recipe_1713425486444.jpg",
      raw_material:
        "กระดูกหมูอ่อน 500 กรัม น้ำปลา 2 ชต น้ำตาลทราย 1 ชช น้ำมะนาว 2 ลูก พริกป่น 1 ชต พริกขี้หนูสวนทุบ 15 เม็ด พริกทอด (บีบให้แตกเล็กน้อย) 5 เม็ด ข่าหั่นแว่น 5 ชิ้น ตะไคร้ (หั่นเฉียง) 2 ต้น ใบมะกรูดฉีก 5-10 ใบ ผักชีฝรั่ง (หั่นท่อนยาว 2 นิ้ว) 2 ต้น หอมแดงทุบ 3 หัว น้ำเปล่า",
      step: "1.เทน้ำเปล่าใส่หม้อต้มให้เดือด แล้วค่อยใส่กระดูกหมูลงไป ตุ๋นด้วยไฟอ่อน 1 ชม  2.เมื่อกระดูกหมูเปื่อยดีแล้ว เติมข่า,ตะไคร้,ใบมะกรูด,หอมแดง,พริกขี้หนู,พริกป่น ปิดฝาต้มต่อไป 10 นาที  3.ปรุงรสด้วยน้ำปลา,น้ำตาล, เสร็จแล้วปิดแก๊ส ค่อยเติมน้ำมะนาว,พริกทอดและผักชีฝรั่งลงไป พร้อมเสิร์ฟ",
      durationId: 2, // Use the foreign key field instead of `duration`
      levelId: 3, // Use the foreign key field instead of `difficult`
      userId: 2, // Use the foreign key field instead of `user`
    },
  });

  const menu5 = await prisma.recipe.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      menu_name: "ข้าวต้มหมูสับ",
      pathimg: "recipe_1713425486148.jpg",
      raw_material:
        "1.ข้าวสวย 1 ถ้วย  2.หมูสับ 2 ขีด  3.น้ำเปล่า 1 ถ้วย  4.ตั้งฉ่าย  5.ผักชี  6.ขิงอ่อน",
      step: "1.หมักหมูสับด้วยพริกไทย ซีอิ๊วขาว  2.ต้มน้ำให้ร้อน ใส่ซุปก้อนลงไป พอซุปเดือด ใส่หมูสับลงไปเป็นก้อนกลมๆ  3.พอหมูสับสุก ใส่ข้าวสวยลงไปต้ม ปรุงรสด้วยซีอิ๊วขาว ใส่ขิงอ่อนลงไป ยกลงจากเตา  4.ตักใส่ชาม โรยตั้งฉ่ายและผักชี ก่อนรับประทาน",
      durationId: 3, // Use the foreign key field instead of `duration`
      levelId: 3, // Use the foreign key field instead of `difficult`
      userId: 2, // Use the foreign key field instead of `user`
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
    menu4,
    menu5
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
