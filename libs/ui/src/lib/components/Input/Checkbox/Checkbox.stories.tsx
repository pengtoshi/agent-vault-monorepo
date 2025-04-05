import type { StoryFn } from "@storybook/react";
import { useState } from "react";
import type { ComponentProps } from "react";
import { Checkbox } from "./Checkbox";

export default { component: Checkbox };

const Template: StoryFn<ComponentProps<typeof Checkbox>> = (args: ComponentProps<typeof Checkbox>) => {
  const [active, setActive] = useState(false);
  return <Checkbox {...args} active={active} handleClick={() => setActive(!active)} />;
};

export const Default = Template.bind({});
