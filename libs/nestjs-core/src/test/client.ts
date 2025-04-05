/*
    Mocking Prisma ORM: https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing
*/
import { PrismaClient } from "~/prisma/generated/client";

const prisma = new PrismaClient();
export default prisma;
