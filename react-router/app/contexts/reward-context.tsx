"use client";

import { createContext, useState } from "react";
import { rewards } from "../data/sample-data";
import type { Reward } from "~/models/reward";

export const RewardContext = createContext<{
  items: Reward[];
  setItems: React.Dispatch<React.SetStateAction<Reward[]>>;
}>({
  items: [],
  setItems: () => {},
});

export function RewardProvider({
  children,
  initialRewards,
}: {
  children: React.ReactNode;
  initialRewards?: Reward[];
}) {
  const [items, setItems] = useState<Reward[]>(initialRewards ?? []);
  return (
    <RewardContext.Provider value={{ items, setItems }}>
      {children}
    </RewardContext.Provider>
  );
}
