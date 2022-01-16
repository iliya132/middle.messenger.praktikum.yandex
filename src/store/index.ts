import Store from '../utils/store';

export const store = new Store();
export type storeRootType = ReturnType<typeof store.getState>;
