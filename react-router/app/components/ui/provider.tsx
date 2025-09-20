"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { rewards, tasks, wallet } from "~/data/sample-data";
import { TaskProvider } from "~/contexts/task-context";
import { system } from "~/themes/config";
import { RewardProvider } from "~/contexts/reward-context";
import { WalletProvider } from "~/contexts/wallet-context";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <TaskProvider initialTasks={tasks}>
        <RewardProvider initialRewards={rewards}>
          <WalletProvider initialWallet={wallet}>{children}</WalletProvider>
        </RewardProvider>
      </TaskProvider>
    </ChakraProvider>
  );
}
