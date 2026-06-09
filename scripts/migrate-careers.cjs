const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function run() {
  const contacts = await db.contactSubmission.findMany({
    where: { service: { startsWith: 'Career Application:' } }
  });

  console.log(`Found ${contacts.length} applications in contacts to migrate...`);

  for (const c of contacts) {
    const msg = c.message || '';
    const experienceMatch = msg.match(/Experience:\s*(.*)/);
    const resumeMatch = msg.match(/Resume URL:\s*(.*)/);
    const linkedinMatch = msg.match(/LinkedIn:\s*(.*)/);
    const portfolioMatch = msg.match(/Portfolio:\s*(.*)/);
    const coverLetterMatch = msg.split('Cover Letter:\n')[1];

    const experience = experienceMatch ? experienceMatch[1].trim() : '0-1 Years';
    const resumeUrl = resumeMatch ? resumeMatch[1].trim() : '';
    const linkedin = linkedinMatch && linkedinMatch[1].trim() !== 'Not Provided' ? linkedinMatch[1].trim() : null;
    const portfolio = portfolioMatch && portfolioMatch[1].trim() !== 'Not Provided' ? portfolioMatch[1].trim() : null;
    const coverLetter = coverLetterMatch ? coverLetterMatch.trim() : null;
    const jobTitle = c.service.replace('Career Application:', '').trim();

    await db.jobApplication.create({
      data: {
        jobTitle,
        name: c.name,
        email: c.email,
        phone: c.phone || '',
        experience,
        resumeUrl,
        coverLetter,
        linkedin,
        portfolio,
        createdAt: c.createdAt
      }
    });

    // Clean up from contact submission so it doesn't show in both places
    await db.contactSubmission.delete({ where: { id: c.id } });
    console.log(`Successfully migrated application for ${c.name}`);
  }
}

run()
  .then(() => {
    console.log('Migration finished!');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
