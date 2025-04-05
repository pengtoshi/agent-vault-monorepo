/* eslint-disable */
export default {
  displayName: "ui",
  preset: "../../jest.preset.js",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "<rootDir>/../../coverage/libs/ui",
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js,jsx}"],
  coveragePathIgnorePatterns: ["<rootDir>/src/index.ts"],
  setupFiles: [],
  setupFilesAfterEnv: ["<rootDir>/setupJest.js"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/../../libs/ui/src/lib/utils/svg.mock.ts",
    "~/client-next/(.*)": "<rootDir>/../../apps/client-next/$1",
    "~/ui/(.*)": "<rootDir>/../../libs/ui/$1",
    "~/prisma/(.*)": "<rootDir>/../../libs/prisma/$1",
  },
};
