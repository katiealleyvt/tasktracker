"use client";

import { getWallet, updateWallet } from "../data/wallet-calls.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { useDidMountEffect } from "hooks/useDidMountEffect.tsx";
import { Wallet } from "models/wallet.tsx";
import { createContext, useEffect, useState } from "react";

export const WalletContext = createContext<{
  wallet: Wallet;
  setWallet: (wallet: Wallet) => void;
}>({
  wallet: { amount: 0 },
  setWallet: () => {},
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<Wallet>({ amount: 0 });

  const update = async (walletItem: Wallet) => {
    try {
      const wallet = await updateWallet({ ...walletItem }, "");
    } catch (error) {
      console.error("Error updating wallet:", error);
    }
  };
  useEffect(() => {
    const fetchWallet = async () => {
      const wallet = await getWallet();
      setItem(wallet);
    };
    fetchWallet();
  }, []);
  const setData = (w: Wallet) => {
    setItem(w);
    update(w);
  };
  return (
    <WalletContext.Provider value={{ wallet: item, setWallet: setData }}>
      {children}
    </WalletContext.Provider>
  );
}
