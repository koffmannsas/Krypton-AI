import { createContext, useContext } from 'react';
import { PricingCatalogClient } from './PricingCatalogClient';

export interface PricingContextType {
  client: typeof PricingCatalogClient;
  format: (amount: number | null, fallback?: string) => string;
}

export const PricingContext = createContext<PricingContextType | null>(null);

export const usePricingContext = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricingContext must be used within a PricingProvider');
  }
  return context;
};
