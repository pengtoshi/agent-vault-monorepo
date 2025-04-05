import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import { Toast } from "./Toast";
import type { ToastProps } from "./Toast";
import { toast } from "./Toaster";
import { Button } from "../../Input/Button/Button";

export default { component: Toast };

const Template: StoryFn<ComponentProps<typeof Toast>> = (args: ToastProps) => (
  <div className="flex w-[360px] flex-col gap-4">
    <Toast {...args} id={1} />
    <Button
      className="w-[160px]"
      onClick={() => toast({ title: "Example Toast", description: "This is toast description." })}
    >
      Show Toast
    </Button>
  </div>
);

const TypeList: StoryFn<ComponentProps<typeof Toast>> = ({ type, ...args }) => (
  <div className="flex flex-col items-start gap-4">
    {([undefined, "success", "error", "info"] as Array<ToastProps["type"]>).map((targetType) => (
      <div key={targetType} className="flex items-center gap-6">
        <span className="w-[100px] text-14/body text-gray-600">{targetType ?? "default"}</span>
        <Toast {...args} id={1} type={targetType} />
        <Toast
          {...args}
          id={1}
          type={targetType}
          button={{
            label: "Click me",
            onClick: () => {
              console.log("Hello world!");
            },
          }}
        />
        <Toast {...args} id={1} description="This is toast description." type={targetType} />
        <Toast
          {...args}
          id={1}
          description="This is toast description."
          type={targetType}
          button={{
            label: "Click me",
            onClick: () => {
              console.log("Hello world!");
            },
          }}
        />
      </div>
    ))}
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Example Toast",
  description: "This is toast description.",
};

export const Type = TypeList.bind({});
Type.args = {
  title: "Example Toast",
};
