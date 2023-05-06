import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    intent: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    intent: "secondary",
    children: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Button",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    children: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Button",
  },
};
