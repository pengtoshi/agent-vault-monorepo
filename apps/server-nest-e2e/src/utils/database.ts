import type { PrismaService } from "@libs/nestjs-core";
import { Prisma } from "~/prisma/generated/client";

export const deleteAllData = async (prisma: PrismaService) => {
  const transactions: any[] = [];

  const tablenames = await prisma.$queryRaw<
    Array<{ table_name: string }>
  >`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`;

  tablenames.forEach((tableName: { table_name: string }) => {
    if (tableName.table_name !== "_prisma_migrations") {
      try {
        transactions.push(prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tableName.table_name}" CASCADE;`));
      } catch (error) {
        console.log({ error });
      }
    }
  });

  try {
    await prisma.$transaction(transactions, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    });
  } catch (error) {
    console.log({ error });
  }
};
