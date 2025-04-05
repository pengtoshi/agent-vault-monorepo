/*
    Mocking Prisma ORM: https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing
*/
import { type DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";
import type { PrismaClient } from "~/prisma/generated/client";
import prisma from "./client";

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient & { extended: PrismaClient }>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient & { extended: PrismaClient }>;

beforeEach(() => {
  mockReset(prismaMock);
});
