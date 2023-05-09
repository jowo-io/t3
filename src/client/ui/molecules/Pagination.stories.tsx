import type { Meta, StoryObj } from "@storybook/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import Pagination from "./Pagination";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Pagination> = {
  title: "atoms/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Example: Story = {
  args: {
    page: 1,
    pages: 3,
    resultsPerPage: 10,
    count: 28,
  },
  argTypes: {
    onChange: {
      action: "change",
    },
  },
};
