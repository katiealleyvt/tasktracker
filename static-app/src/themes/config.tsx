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
        tabs: {
          tasks: { value: "{colors.brand.green}" },
          rewards: { value: "{colors.brand.blue}" },
          archive: { value: "{colors.brand.purple}" },
          dwd: { value: "{colors.brand.pink}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
