import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import { BottomSheet } from "./BottomSheet";
import { Button } from "../../Input/Button/Button";

export default { component: BottomSheet };

const Template: StoryFn<ComponentProps<typeof BottomSheet>> = (args: ComponentProps<typeof BottomSheet>) => {
  return <BottomSheet trigger={<Button>Show BottomSheet</Button>} {...args} />;
};

export const BottomSheetComponent = Template.bind({});
BottomSheetComponent.args = {
  title: "BottomSheet Title",
  description: "BottomSheet Description",
  contents: <div className="h-[80px] w-full rounded-md border border-gray-200" />,
  actions: [{ label: "Main Action", onClick: () => {} }],
};
