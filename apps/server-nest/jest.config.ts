/* eslint-disable */
export default {
  displayName: "server-nest",
  preset: "../../jest.preset.js",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../coverage/apps/server-nest",
  moduleNameMapper: {
    "^~/server-nest/(.*)$": "<rootDir>/$1",
    "^~/server-core/(.*)$": "<rootDir>/../../libs/server-core/$1",
    "^~/prisma/(.*)$": "<rootDir>/../../libs/prisma/$1",
  },
  transformIgnorePatterns: ["libs/prisma/generated/client"],
};
