import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reservedListKey } from '@/constants';

interface IListsState {
  lists: { [reservedListKey]: string[] } & Record<string, string[]>;
}

interface IPayloadTickerData {
  name: string;
  value: string;
}

const initialState: IListsState = {
  lists: { [reservedListKey]: [] },
};

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    putTickerToList: (state, action: PayloadAction<IPayloadTickerData>) => {
      state.lists[action.payload.name] = [
        ...state.lists[action.payload.name],
        action.payload.value,
      ];
    },
    filterTickersInList: (state, action: PayloadAction<IPayloadTickerData>) => {
      state.lists[action.payload.name] = state.lists[action.payload.name].filter(
        (ticker) => ticker !== action.payload.value
      );
    },
    addNewEmptyList: (state, action: PayloadAction<string>) => {
      if (!Object.keys(state.lists).includes(action.payload)) {
        state.lists[action.payload] = [];
      }
    },
    removeList: (state, action: PayloadAction<string>) => {
      const allLists = state.lists;
      delete allLists[action.payload];
      state.lists = allLists;
    },
  },
  selectors: {
    getEntriesLists: (sliceState) => Object.entries(sliceState.lists),
    getListWithQuotes: (sliceState) => sliceState.lists,
  },
});

export const { filterTickersInList, putTickerToList, addNewEmptyList, removeList } =
  listsSlice.actions;
export const { getEntriesLists, getListWithQuotes } = listsSlice.selectors;
