import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import debounce from 'lodash/debounce';

interface OffersFilterContextProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  resetFilter: () => void;
  selectedStore: string;
  setSelectedStore: (store: string) => void;
  resetStore: () => void;
}

const OffersFilterContext = createContext<OffersFilterContextProps | undefined>(undefined);

export const OffersFilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFilter, setSelectedFilterRaw] = useState<string>('All');
  const [selectedStore, setSelectedStoreRaw] = useState<string>('All');
  // Debounce the setters
  const setSelectedFilter = useMemo(() => debounce(setSelectedFilterRaw, 300), []);
  const setSelectedStore = useMemo(() => debounce(setSelectedStoreRaw, 300), []);
  const resetFilter = () => setSelectedFilter('All');
  const resetStore = () => setSelectedStore('All');
  return (
    <OffersFilterContext.Provider value={{ selectedFilter, setSelectedFilter, resetFilter, selectedStore, setSelectedStore, resetStore }}>
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
