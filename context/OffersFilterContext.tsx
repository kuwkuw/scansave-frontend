import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OffersFilterContextProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  resetFilter: () => void;
}

const OffersFilterContext = createContext<OffersFilterContextProps | undefined>(undefined);

export const OffersFilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const resetFilter = () => setSelectedFilter('All');
  return (
    <OffersFilterContext.Provider value={{ selectedFilter, setSelectedFilter, resetFilter }}>
      {children}
    </OffersFilterContext.Provider>
  );
};

export const useOffersFilter = () => {
  const context = useContext(OffersFilterContext);
  if (!context) {
    throw new Error('useOffersFilter must be used within an OffersFilterProvider');
  }
  return context;
};
