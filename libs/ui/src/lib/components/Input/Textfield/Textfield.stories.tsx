import type { StoryFn } from "@storybook/react";
import { useState } from "react";
import type { ComponentProps } from "react";
import { Textfield } from "./Textfield";

export default { component: Textfield };

const Template: StoryFn<ComponentProps<typeof Textfield>> = (args: ComponentProps<typeof Textfield>) => {
  const [value, setValue] = useState("");
  return <Textfield {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  className: "w-[240px]",
  placeholder: "Enter text here",
};
