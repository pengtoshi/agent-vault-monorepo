import { composeStories } from "@storybook/react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./Textfield.stories";

describe("TextField", () => {
  Object.entries(composeStories(stories)).forEach(([, Story]) => {
    it("should render", () => {
      const { baseElement } = render(<Story />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
