import type { Meta, StoryObj } from "@storybook/react";

import Spinner from "./Spinner";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Spinner> = {
  title: "atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
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
    size: "medium",
    children: "Spinner",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Spinner",
  },
};
