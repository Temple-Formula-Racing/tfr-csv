import { createStore } from 'zustand/vanilla';

// Map of time (in seconds) to the corresponding data for that time (RPM, O2, etc)
type CSVMap = Map<number, string[]>;

export type CSVState = {
  count: number,
  fromTime: number,
  toTime: number,

  csvHeaders: string[],
  csvMap: CSVMap
}

export type CSVActions = {
  decrementCount: () => void
  incrementCount: () => void,

  setFromTime: (fromTime: number) => void, // eslint-disable-line no-unused-vars
  setToTime: (toTime: number) => void, // eslint-disable-line no-unused-vars

  setCSVHeaders(data: string[]): void, // eslint-disable-line no-unused-vars
  setCSVMap: (data: CSVMap) => void, // eslint-disable-line no-unused-vars
}

export type CSVStore = CSVState & CSVActions;

export const defaultInitState: CSVState = {
  count: 0,
  fromTime: 0,
  toTime: 0,
  csvHeaders: [],
  csvMap: new Map()
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

    setCSVHeaders: (data: string[]) => set(() => ({ csvHeaders: data })),
    setCSVMap: (data: CSVMap) => set(() => ({ csvMap: data })),
  }));
};