import { createContext } from "react";
import { useMediaQuery } from "react-responsive";

export const WindowContext = createContext<{
  isMobile: boolean;
}>({
  isMobile: false,
});

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <WindowContext.Provider
      value={{
        isMobile,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}
