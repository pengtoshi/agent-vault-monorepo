import type { StoryFn } from "@storybook/react";
import { type ComponentProps, useState } from "react";
import { Textarea } from "./Textarea";

export default { component: Textarea };

const Template: StoryFn<ComponentProps<typeof Textarea>> = (args: ComponentProps<typeof Textarea>) => {
  const [value, setValue] = useState("");
  return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  className: "w-[360px] h-[240px]",
  placeholder: "Enter text here",
  maxLength: 200,
};
