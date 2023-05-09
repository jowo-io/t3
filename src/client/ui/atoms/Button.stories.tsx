import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Button>;

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
    size: "lg",
    children: "Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Button",
  },
};
