'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

import {
  type CSVStore,
  createCSVStore,
  initCSVStore,
} from '@/stores/csv-store';

export const CSVStoreContext = createContext<StoreApi<CSVStore> | null>(
  null,
);

export interface CSVStoreProviderProps {
  children: ReactNode
}

export const CSVStoreProvider = ({
  children,
}: CSVStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CSVStore>>();
  if (!storeRef.current) {
    storeRef.current = createCSVStore(initCSVStore());
  }

  return (
    <CSVStoreContext.Provider value={storeRef.current}>
      {children}
    </CSVStoreContext.Provider>
  );
};

export const useCSVStore = <T,>(
  selector: (store: CSVStore) => T, // eslint-disable-line no-unused-vars
): T => {
  const csvStoreContext = useContext(CSVStoreContext);

  if (!csvStoreContext) {
    throw new Error(`useCSVStore must be use within CSVStoreProvider`);
  }

  return useStore(csvStoreContext, selector);
};