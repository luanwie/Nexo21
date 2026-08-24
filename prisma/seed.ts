import { PrismaClient, ProductType } from "../src/generated/prisma-v2";
import { OFFERS } from "../src/lib/offers";

const prisma = process.env.DATABASE_URL
  ? new PrismaClient({ datasourceUrl: process.env.DATABASE_URL })
  : new PrismaClient();

async function main() {
  for (const [index, offer] of OFFERS.entries()) {
    await prisma.product.upsert({
      where: { slug: offer.slug },
      update: {
        title: offer.title,
        description: offer.description,
        type: offer.type as ProductType,
        priceCents: offer.priceCents,
        currency: offer.currency,
        sortOrder: index,
        active: offer.launchReady,
      },
      create: {
        slug: offer.slug,
        title: offer.title,
        description: offer.description,
        type: offer.type as ProductType,
        priceCents: offer.priceCents,
        currency: offer.currency,
        sortOrder: index,
        active: offer.launchReady,
      },
    });
  }

  console.log(`Seeded ${OFFERS.length} offers.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
