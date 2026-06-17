const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
  try {
    const pages = await db.servicePage.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        image: true,
        bgType: true,
        bgColor: true,
        mobileImage: true
      }
    });
    console.log("All Service Pages:", JSON.stringify(pages, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await db.$disconnect();
  }
}

main();
