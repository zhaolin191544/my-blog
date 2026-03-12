import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:zhaolin2011@localhost:5432/myblog?schema=public";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 12);

  await prisma.adminUser.upsert({
    where: { username: process.env.ADMIN_USERNAME || "admin" },
    update: {
      password: hashedPassword,
    },
    create: {
      username: process.env.ADMIN_USERNAME || "admin",
      password: hashedPassword,
    },
  });

  console.log("Admin user seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
