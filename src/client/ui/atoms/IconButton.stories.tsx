import type { Meta, StoryObj } from "@storybook/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import IconButton from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Standalone: Story = {
  args: {
    position: "standalone",
    children: "1",
  },
};

export const Left: Story = {
  args: {
    position: "left",
    children: <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />,
  },
};

export const Right: Story = {
  args: {
    position: "right",
    children: <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />,
  },
};
