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
        { name: "blue", value: "#3469db" },
        { name: "gray", value: "#8d8d8d" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
};

export default preview;
