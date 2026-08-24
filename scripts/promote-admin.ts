import { PrismaClient } from "../src/generated/prisma-v2";

const prisma = process.env.DATABASE_URL
  ? new PrismaClient({ datasourceUrl: process.env.DATABASE_URL })
  : new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) throw new Error("ADMIN_EMAIL is required");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Create and verify the admin account before promotion");
  if (!user.emailVerified && process.env.REQUIRE_EMAIL_VERIFICATION === "true") {
    throw new Error("Admin email must be verified before promotion");
  }
  await prisma.user.update({ where: { id: user.id }, data: { role: "ADMIN" } });
  console.log(`Promoted verified user ${email} to ADMIN.`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
