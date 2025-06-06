import { jest } from "@jest/globals";
import { setProjectAnnotations } from "@storybook/react";
import * as globalStorybookConfig from "~/.storybook/preview";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

setProjectAnnotations(globalStorybookConfig);
