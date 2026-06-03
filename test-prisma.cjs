const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function test() {
  try {
    if (!db.siteSetting) {
      console.log("ERROR: db.siteSetting is undefined! The Prisma Client needs to be regenerated.");
    } else {
      console.log("SUCCESS: db.siteSetting exists.");
      const res = await db.siteSetting.upsert({
        where: { key: 'test' },
        update: { value: 'test' },
        create: { key: 'test', value: 'test' }
      });
      console.log("Upsert result:", res);
    }
  } catch (e) {
    console.error("Crash:", e);
  } finally {
    await db.$disconnect();
  }
}
test();
