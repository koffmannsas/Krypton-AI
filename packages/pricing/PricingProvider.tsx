import React, { ReactNode } from 'react';
import { PricingContext } from './PricingContext';
import { PricingCatalogClient } from './PricingCatalogClient';
import { PricingFormatter } from './PricingFormatter';

interface PricingProviderProps {
  children: ReactNode;
}

export const PricingProvider: React.FC<PricingProviderProps> = ({ children }) => {

  const format = (amount: number | null, fallback: string = "SUR DEVIS"): string => {
    if (amount === null) return fallback;
    return PricingFormatter.formatFCFA(amount);
  };

  return (
    <PricingContext.Provider value={{ client: PricingCatalogClient, format }}>
      {children}
    </PricingContext.Provider>
  );
};
