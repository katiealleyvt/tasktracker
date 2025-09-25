"use client";

import { createContext, useEffect, useState } from "react";
import { wallet } from "../data/sample-data";
import type { Wallet } from "~/models/wallet";
import { updateWallet } from "~/data/wallet-calls";

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
  useEffect(() => {
    const update = async () => {
      try {
        const wallet = await updateWallet({ ...item });
      } catch (error) {
        console.error("Error updating wallet:", error);
      }
    };
    update();
  }, [item]);
  return (
    <WalletContext.Provider value={{ wallet: item, setWallet: setItem }}>
      {children}
    </WalletContext.Provider>
  );
}
