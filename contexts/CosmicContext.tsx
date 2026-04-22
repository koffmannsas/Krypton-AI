import React, { createContext, useState, useContext } from "react";
import { sendToFiko } from "../services/fikoAPI";

const CosmicContext = createContext<{
  activeCardId: string | null;
  setActiveCardId: (id: string | null) => void;
}>({
  activeCardId: null,
  setActiveCardId: () => {},
});

// Explicitly defining CosmicProvider as a React.FC with children ensures TypeScript correctly handles JSX children for this component.
export const CosmicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <CosmicContext.Provider value={{ activeCardId, setActiveCardId }}>
      {children}
    </CosmicContext.Provider>
  );
};

export function useCosmic() {
  return useContext(CosmicContext);
}
