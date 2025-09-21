import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          green: { value: "#A7E8BD" },
          blue: { value: "#B3E0FF" },
          purple: { value: "#D6C8FF" },
          pink: { value: "#FFD1DC" },
          gold: { value: "#FFD700" },
          nav: { value: "#1f142e" },
          mutedBlack: { value: "#141314" },
          darkPurple: { value: "#2e1e47" },
        },
      },
    },
    semanticTokens: {
      colors: {
        status: {
          daily: { value: "{colors.brand.green}" },
          todo: { value: "{colors.brand.blue}" },
          done: { value: "{colors.brand.purple}" },
          rewards: { value: "{colors.brand.pink}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
