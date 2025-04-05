/* eslint-disable */
export default {
  displayName: "nestjs-core",
  preset: "../../jest.preset.js",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../coverage/libs/nestjs-core",
  moduleNameMapper: {
    "^~/nestjs-core/(.*)$": "<rootDir>/$1",
    "^~/prisma/(.*)$": "<rootDir>/../../libs/prisma/$1",
  },
  transformIgnorePatterns: ["libs/prisma/generated/client"],
  passWithNoTests: true,
};
