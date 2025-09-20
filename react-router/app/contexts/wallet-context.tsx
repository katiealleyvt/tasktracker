"use client";

import { createContext, useState } from "react";
import { wallet } from "../data/sample-data";
import type { Wallet } from "~/models/wallet";

export const WalletContext = createContext<{
  wallet: Wallet;
  setWallet: React.Dispatch<React.SetStateAction<Wallet>>;
}>({
  wallet: { amount: 0 },
  setWallet: () => {},
});

export function WalletProvider({
  children,
  initialWallet,
}: {
  children: React.ReactNode;
  initialWallet: Wallet;
}) {
  const [item, setItem] = useState<Wallet>(initialWallet);
  return (
    <WalletContext.Provider value={{ wallet: item, setWallet: setItem }}>
      {children}
    </WalletContext.Provider>
  );
}
