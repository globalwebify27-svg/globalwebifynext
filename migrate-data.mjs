import { PrismaClient } from '@prisma/client';

// 1. PUT YOUR OLD LOCAL DATABASE URL HERE
const LOCAL_URL = "mysql://root:@localhost:3306/global_weblify"; 

// 2. REMOTE DB AUTOMATICALLY CONNECTS TO TIDB USING YOUR .ENV FILE
const TIDB_URL = process.env.DATABASE_URL; 

async function migrate() {
  console.log('Connecting to databases...');
  const localDb = new PrismaClient({ datasources: { db: { url: LOCAL_URL } } });
  const remoteDb = new PrismaClient(); // Auto-loads from .env

  try {
    console.log('Fetching local data...');
    const blogs = await localDb.blogPost.findMany();
    const services = await localDb.servicePage.findMany();
    const contacts = await localDb.contactSubmission.findMany();
    
    console.log(`Found ${blogs.length} blogs, ${services.length} services, ${contacts.length} contacts.`);

    console.log('Emptying remote TiDB tables to prevent duplicates...');
    await remoteDb.blogPost.deleteMany();
    await remoteDb.servicePage.deleteMany();
    await remoteDb.contactSubmission.deleteMany();

    if (blogs.length > 0) {
      console.log('Migrating blogs...');
      await remoteDb.blogPost.createMany({ data: blogs });
    }

    if (services.length > 0) {
      console.log('Migrating services...');
      await remoteDb.servicePage.createMany({ data: services });
    }

    if (contacts.length > 0) {
      console.log('Migrating contacts...');
      await remoteDb.contactSubmission.createMany({ data: contacts });
    }

    console.log('✅ Migration completely finished successfully!');
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await localDb.$disconnect();
    await remoteDb.$disconnect();
  }
}

migrate();
