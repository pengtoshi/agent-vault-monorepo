import type { StoryFn } from "@storybook/react";
import { useState } from "react";
import type { ComponentProps } from "react";
import { Switch } from "./Switch";

export default { component: Switch };

const Template: StoryFn<ComponentProps<typeof Switch>> = (args: ComponentProps<typeof Switch>) => {
  const [active, setActive] = useState(false);
  return <Switch {...args} active={active} handleClick={() => setActive(!active)} />;
};

export const Default = Template.bind({});
Default.args = {
  size: "medium",
};
