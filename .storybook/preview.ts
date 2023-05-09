import type { Preview } from "@storybook/react";

import "@/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "blue",
      values: [
        { name: "blue", value: "lightblue" },
        { name: "gray", value: "lightgray" },
        { name: "white", value: "white" },
      ],
    },
  },
};

export default preview;
