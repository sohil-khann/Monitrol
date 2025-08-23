import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

type AcceleratedPrismaClient = PrismaClient & ReturnType<typeof withAccelerate>;

// Define global type for TS (Node global namespace)
declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: AcceleratedPrismaClient | undefined;
}

let prisma: AcceleratedPrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient() as AcceleratedPrismaClient;
  prisma.$extends(withAccelerate());
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient() as AcceleratedPrismaClient;
    global.cachedPrisma.$extends(withAccelerate());
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
