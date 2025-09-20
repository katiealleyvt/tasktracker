"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { rewards, tasks } from "~/data/sample-data";
import { TaskProvider } from "~/contexts/task-context";
import { system } from "~/themes/config";
import { RewardProvider } from "~/contexts/reward-context";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <TaskProvider initialTasks={tasks}>
        <RewardProvider initialRewards={rewards}>{children}</RewardProvider>
      </TaskProvider>
    </ChakraProvider>
  );
}
