import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import type { ButtonProps } from "./Button";
import { Button } from "./Button";
import { Icon as IconComponent } from "../../Icon/Icon";

export default { component: Button };

const Template: StoryFn<ComponentProps<typeof Button>> = (args) => <Button {...args} />;

const VariantList: StoryFn<ComponentProps<typeof Button>> = ({ variant, ...args }) => (
  <div className="flex flex-row gap-8">
    {(
      [undefined, "solid", "outlinedPrimary", "outlinedAssertive", "textPrimary", "textAssertive"] as Array<
        ButtonProps["variant"]
      >
    ).map((targetVariant) => (
      <div className="flex flex-col gap-4" key={targetVariant}>
        <p className="text-14/body text-gray-600">{targetVariant ?? "default"}</p>
        <div className="flex flex-col gap-4">
          <Button {...args} variant={targetVariant ?? variant} />
          <Button {...args} variant={targetVariant ?? variant} disabled />
        </div>
      </div>
    ))}
  </div>
);

const SizeList: StoryFn<ComponentProps<typeof Button>> = ({ size, ...args }) => (
  <div className="flex flex-row gap-8">
    {([undefined, "small", "medium", "large"] as Array<ButtonProps["size"]>).map((targetSize) => (
      <div className="flex flex-col gap-4" key={targetSize}>
        <p className="text-14/body text-gray-600">{targetSize ?? "default"}</p>
        <div className="flex flex-col gap-4">
          <Button {...args} size={targetSize ?? size} />
          <Button {...args} size={targetSize ?? size} disabled />
        </div>
      </div>
    ))}
  </div>
);

const IconList: StoryFn<ComponentProps<typeof Button>> = ({ leftIcon, rightIcon, ...args }) => (
  <div className="flex flex-row gap-8">
    <div className="flex flex-col gap-4">
      <p className="text-14/body text-gray-600">No Icon</p>
      <div className="flex flex-col gap-4">
        <Button {...args} />
        <Button {...args} disabled />
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <p className="text-14/body text-gray-600">Left Icon</p>
      <div className="flex flex-col gap-4">
        <Button {...args} leftIcon={leftIcon} />
        <Button {...args} leftIcon={leftIcon} disabled />
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <p className="text-14/body text-gray-600">Right Icon</p>
      <div className="flex flex-col gap-4">
        <Button {...args} rightIcon={rightIcon} />
        <Button {...args} rightIcon={rightIcon} disabled />
      </div>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  type: "button",
  children: "Button",
};

export const Variant = VariantList.bind({});
Variant.args = {
  type: "button",
  children: "Button",
};

export const Size = SizeList.bind({});
Size.args = {
  type: "button",
  children: "Button",
};

export const Icon = IconList.bind({});
Icon.args = {
  type: "button",
  children: "Button",
  leftIcon: <IconComponent name="ChevronLeft" size={20} className="text-gray-50" />,
  rightIcon: <IconComponent name="ChevronRight" size={20} className="text-gray-50" />,
};
