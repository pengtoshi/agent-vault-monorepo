import type { StorybookConfig } from "@storybook/nextjs";

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

const config: StorybookConfig = {
  framework: "@storybook/nextjs",
  stories: [
    {
      directory: "../apps/client-next/src",
      titlePrefix: "client-next",
      files: "**/*.stories.@(js|jsx|ts|tsx)",
    },
    {
      directory: "../libs/ui/src/lib",
      titlePrefix: "UI",
      files: "**/*.stories.@(js|jsx|ts|tsx)",
    },
  ],
  staticDirs: [path.resolve(__dirname, "../libs/ui/public")],
  addons: [
    "@storybook/addon-essentials",
    "@nx/react/plugins/storybook",
    {
      name: "storybook-addon-swc",
      options: {
        enable: true,
        enableSwcLoader: true,
        enableSwcMinify: true,
        swcLoaderOptions: {
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
        swcMinifyOptions: {},
      },
    },
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      devtool: false,
      ignoreWarnings: [/Failed to parse source map/],
      resolve: {
        ...config.resolve,
        plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, "./tsconfig.json") })],
      },
    };
  },
  docs: {
    autodocs: true,
  },
};

export default config;
