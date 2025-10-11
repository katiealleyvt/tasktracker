"use client";

import { updateWallet } from "../data/wallet-calls.ts";
import { Wallet } from "@/models/wallet";
import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

export const WalletContext = createContext<{
  wallet: Wallet;
  setWallet: React.Dispatch<React.SetStateAction<Wallet>>;
}>({
  wallet: { amount: 0 },
  setWallet: () => {},
});

export function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
    };
    if (isAuthenticated) getToken();
  }, [isAuthenticated, getAccessTokenSilently]);
  const [item, setItem] = useState<Wallet>({amount: 0});
  useEffect(() => {
    const update = async () => {
      try {
        const wallet = await updateWallet({ ...item }, token);
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
