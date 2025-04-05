import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import { Dropdown } from "./Dropdown";

export default { component: Dropdown };

const Template: StoryFn<ComponentProps<typeof Dropdown>> = (args: ComponentProps<typeof Dropdown>) => (
  <div className="flex h-[160px] w-full">
    <Dropdown {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  options: ["Apple", "Banana", "Cherry"],
  onSelect: (option) => console.log(option),
};
