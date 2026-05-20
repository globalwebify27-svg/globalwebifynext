import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.servicePage.findMany({
    select: { slug: true, title: true, contentTitle: true, content: true },
  });
  console.log("Pages in DB:", JSON.stringify(pages, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
