import type { StoryFn } from "@storybook/react";
import { useState } from "react";
import type { ComponentProps } from "react";
import { Radio } from "./Radio";

export default { component: Radio };

const Template: StoryFn<ComponentProps<typeof Radio>> = (args: ComponentProps<typeof Radio>) => {
  const [active, setActive] = useState(false);
  return <Radio {...args} active={active} handleClick={() => setActive(!active)} />;
};

export const Default = Template.bind({});
Default.args = {
  size: "medium",
};
