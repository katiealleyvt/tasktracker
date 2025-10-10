"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { RewardProvider } from "../../contexts/reward-context";
import { TaskProvider } from "../../contexts/task-context";
import { WalletProvider } from "../../contexts/wallet-context";
import { system } from "../../themes/config";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <TaskProvider>
        <RewardProvider>
          <WalletProvider>{children}</WalletProvider>
        </RewardProvider>
      </TaskProvider>
    </ChakraProvider>
  );
}
