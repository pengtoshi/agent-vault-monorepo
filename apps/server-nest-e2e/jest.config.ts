/* eslint-disable */
export default {
  displayName: "server-nest-e2e",
  preset: "../../jest.preset.js",
  moduleFileExtensions: ["ts", "js"],
  testEnvironment: "node",
  coverageDirectory: "../../coverage/server-nest-e2e",
  forceExit: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js,jsx}"],
  testTimeout: 10000,
  moduleNameMapper: {
    "^~/server-nest-e2e/(.*)$": "<rootDir>/$1",
    "^~/prisma/(.*)$": "<rootDir>/../../libs/prisma/$1",
  },
  transformIgnorePatterns: ["libs/prisma/generated/client"],
};
