import type { Meta, StoryObj } from "@storybook/react";

import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Square: Story = {
  args: {
    size: "lg",
    src: "https://upload.wikimedia.org/wikipedia/en/4/4e/Elijah_Wood_as_Frodo_Baggins.png",
  },
};

export const Verical: Story = {
  args: {
    size: "lg",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Frodo_by_Mark_Ferrari.jpg/490px-Frodo_by_Mark_Ferrari.jpg",
  },
};

export const Horizontal: Story = {
  args: {
    size: "lg",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0d/ZKMalbork_cropped.jpg",
  },
};

export const Fallback: Story = {
  args: {
    size: "lg",
  },
};
