import type { Meta, StoryObj } from "@storybook/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import TitledAvatar from "./TitledAvatar";

const meta: Meta<typeof TitledAvatar> = {
  title: "atoms/TitledAvatar",
  component: TitledAvatar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TitledAvatar>;

export const Default: Story = {
  args: {
    title: "Bilbo Baggins",
  },
};

export const Left: Story = {
  args: {
    title: "Bilbo Baggins",
    direction: "left",
  },
};

export const Small: Story = {
  args: {
    title: "Bilbo Baggins",
    size: "sm",
  },
};
