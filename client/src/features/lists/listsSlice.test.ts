import {
  addNewEmptyList,
  filterTickersInList,
  listsSlice,
  putTickerToList,
  removeList,
} from './listsSlice';
import { AppStore, makeStore } from '@/app/store';
import { reservedListKey } from '@/constants';

describe('listsSlice', () => {
  let store: AppStore;

  beforeEach(() => {
    store = makeStore();
  });

  it('should initialize the state correctly', () => {
    expect(store.getState().lists.lists).toEqual({ [reservedListKey]: [] });
  });

  it('should add a ticker to a list', () => {
    const name = 'New List';
    const value = 'TSLA';

    store.dispatch(addNewEmptyList(name));
    store.dispatch(putTickerToList({ name, value }));

    expect(store.getState().lists.lists[name]).toContain(value);
  });

  it('should remove a ticker from a list', () => {
    const name = 'New List';
    const value = 'TSLA';

    store.dispatch(addNewEmptyList(name));
    store.dispatch(putTickerToList({ name, value }));
    store.dispatch(filterTickersInList({ name, value }));

    expect(store.getState().lists.lists[name]).not.toContain(value);
  });

  it('should add a new empty list', () => {
    const name = 'New List';

    store.dispatch(addNewEmptyList(name));

    expect(store.getState().lists.lists).toHaveProperty(name);
  });

  it('should remove a list', () => {
    const name = 'New List';

    store.dispatch(addNewEmptyList(name));
    store.dispatch(removeList(name));

    expect(store.getState().lists.lists).not.toHaveProperty(name);
  });
});

describe('listsSlice actions', () => {
  let store: any;

  beforeEach(() => {
    store = makeStore();
  });

  it('should add a new empty list', () => {
    const name = 'New List';

    store.dispatch(addNewEmptyList(name));

    expect(store.getState().lists.lists).toHaveProperty(name);
  });

  it('should put a ticker to a list', () => {
    const name = 'New List';
    const value = 'TSLA';

    store.dispatch(addNewEmptyList(name));
    store.dispatch(putTickerToList({ name, value }));

    expect(store.getState().lists.lists[name]).toContain(value);
  });

  it('should remove a list', () => {
    const name = 'New List';

    store.dispatch(addNewEmptyList(name));
    store.dispatch(removeList(name));

    expect(store.getState().lists.lists).not.toHaveProperty(name);
  });
});
