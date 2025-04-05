import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import { Modal } from "./Modal";
import { Button } from "../../Input/Button/Button";

export default { component: Modal };

const Template: StoryFn<ComponentProps<typeof Modal>> = (args: ComponentProps<typeof Modal>) => (
  <Modal trigger={<Button>Show Modal</Button>} {...args} />
);

export const ModalComponent = Template.bind({});
ModalComponent.args = {
  title: "Modal Title",
  size: "small",
  description: "Modal Description",
  actions: [{ label: "Main Action", onClick: () => {} }],
};
