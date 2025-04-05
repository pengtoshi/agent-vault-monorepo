import { Preview } from "@storybook/react";
import { Toaster } from "@libs/ui";
import "~/ui/public/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "padded",
    controls: { expanded: true },
  },
  decorators: [
    (Story, context) => {
      return (
        <>
          <Toaster />
          <Story />
        </>
      );
    },
  ],
};

export default preview;
