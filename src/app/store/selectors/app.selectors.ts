import { IAppState } from '../app.store';

export const getLoader = (state: IAppState) => state.loader;
export const getCounter = (state: IAppState) => state.counter;