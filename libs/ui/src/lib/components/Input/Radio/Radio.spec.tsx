import { composeStories } from "@storybook/react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./Radio.stories";

describe("Radio", () => {
  Object.entries(composeStories(stories)).forEach(([, Story]) => {
    it("should render", async () => {
      const { baseElement } = render(<Story />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
