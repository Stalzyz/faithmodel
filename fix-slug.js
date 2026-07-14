const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const homePage = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (homePage) {
    await prisma.page.update({
      where: { slug: '' },
      data: {
        content: homePage.content,
        seo: homePage.seo || undefined,
        title: 'Home'
      }
    });
    // await prisma.page.delete({ where: { slug: 'home' } });
    console.log('Migrated blocks to empty slug');
  } else {
    console.log('No home slug found');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
