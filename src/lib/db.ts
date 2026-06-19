import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Automatically increase connection limit for Vercel/Serverless environments
let dbUrl = process.env.DATABASE_URL || '';
if (dbUrl && !dbUrl.includes('connection_limit')) {
  dbUrl += dbUrl.includes('?') ? '&connection_limit=20&pool_timeout=60' : '?connection_limit=20&pool_timeout=60';
  process.env.DATABASE_URL = dbUrl;
}

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
