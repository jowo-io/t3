import type { Meta, StoryObj } from "@storybook/react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";

import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "atoms/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Header>;

export const H1: Story = {
  name: "H1",
  args: {
    tag: "h1",
    children: "Hello world",
    options: (
      <Cog6ToothIcon className="h-md w-md text-white" aria-hidden="true" />
    ),
  },
};
export const H2: Story = {
  name: "H2",
  args: {
    tag: "h2",
    children: "Hello world",
  },
};
export const H3: Story = {
  name: "H3",
  args: {
    tag: "h3",
    children: "Hello world",
  },
};
export const H4: Story = {
  name: "H4",
  args: {
    tag: "h4",
    children: "Hello world",
  },
};
export const H5: Story = {
  name: "H5",
  args: {
    tag: "h5",
    children: "Hello world",
  },
};
export const H6: Story = {
  name: "H6",
  args: {
    tag: "h6",
    children: "Hello world",
  },
};
