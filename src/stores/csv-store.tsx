import { createStore } from 'zustand/vanilla';

type CSVData = { headers: string[], dataRows: string[][] };

export type CSVState = {
  count: number,
  fromTime: number,
  toTime: number,
  csvData: CSVData
}

export type CSVActions = {
  decrementCount: () => void
  incrementCount: () => void,

  setFromTime: (fromTime: number) => void, // eslint-disable-line no-unused-vars
  setToTime: (toTime: number) => void, // eslint-disable-line no-unused-vars

  setCSVData: (data: CSVData) => void, // eslint-disable-line no-unused-vars
}

export type CSVStore = CSVState & CSVActions;

export const defaultInitState: CSVState = {
  count: 0,
  fromTime: 0,
  toTime: 0,
  csvData: { headers: [], dataRows: [] }
};

export const initCSVStore = (): CSVState => {
  return defaultInitState;
};

export const createCSVStore = (
  initState: CSVState = defaultInitState,
) => {
  return createStore<CSVStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),

    setFromTime: (fromTime: number) => set(() => ({ fromTime })),
    setToTime: (toTime: number) => set(() => ({ toTime })),

    setCSVData: (data: CSVData) => set(() => ({ csvData: data })),
  }));
};