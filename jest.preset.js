const nxPreset = require("@nx/jest/preset").default;

module.exports = {
  ...nxPreset,
  resolver: "@nx/jest/plugins/resolver",
  moduleFileExtensions: ["ts", "js", "html"],
  coverageReporters: ["html"],
  clearMocks: true,
  transform: {
    "^.+\\.(ts|tsx|js|jsx|html)$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
            dynamicImport: false,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            react: {
              runtime: "automatic",
            },
          },
          target: "es2022",
        },
      },
    ],
  },
  transformIgnorePatterns: ["libs/prisma/generated/client"],
};
