import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";
import ws from "ws";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error("DATABASE_URL is not defined in environment variables");
    // During build time on Vercel, it might be missing if not set in project settings
    // Return a dummy client or handle it gracefully
    return new PrismaClient();
  }

  const pool = new Pool({ connectionString, webSocketConstructor: ws });
  const adapter = new PrismaNeon(pool);
  
  return new PrismaClient({
    adapter,
    log: ["query", "error", "warn"],
  });
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
