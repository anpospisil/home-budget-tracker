import { PrismaClient } from './src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function flushDb() {
  await prisma.transaction.deleteMany({});
  console.log("All transactions deleted!");
}

flushDb()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
