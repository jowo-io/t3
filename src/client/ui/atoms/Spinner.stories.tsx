import type { Meta, StoryObj } from "@storybook/react";

import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: {
    intent: "primary",
    children: "Spinner",
  },
};

export const Secondary: Story = {
  args: {
    intent: "secondary",
    children: "Spinner",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Spinner",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Spinner",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Spinner",
  },
};
