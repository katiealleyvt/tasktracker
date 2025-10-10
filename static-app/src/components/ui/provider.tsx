"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { wallet } from "./data/sample-data";
import { TaskProvider } from "./contexts/task-context";
import { system } from "./themes/config";
import { RewardProvider } from "./contexts/reward-context";
import { WalletProvider } from "./contexts/wallet-context";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <TaskProvider>
        <RewardProvider>
          <WalletProvider initialWallet={wallet}>{children}</WalletProvider>
        </RewardProvider>
      </TaskProvider>
    </ChakraProvider>
  );
}
