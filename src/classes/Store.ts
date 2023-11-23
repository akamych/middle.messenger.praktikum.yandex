import EventBus from './EventBus.ts';
import Block from './Block.ts';
import { propType } from '../utils/types/propType.ts';
import { stateMapper } from '../utils/types/stateMapper.ts';
import set from '../utils/functions/set.ts';
import pages from '../utils/constants/pagesData.json';
import bundle from '../utils/constants/text.json';

export enum StoreEvents {
    // eslint-disable-next-line no-unused-vars
    Updated = 'updated',
}

class Store extends EventBus {
  private state: propType = {
    bundle: {
      ...bundle,
      pages,
    },
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();

// eslint-disable-next-line max-len, no-unused-vars
export const useStore = (mapState: stateMapper) => (BlockClass: typeof Block) => {
  const initialState: propType = mapState(store.getState());

  class storeAdded extends BlockClass {
    constructor(props: any) {
      super(props, initialState);
      store.on(StoreEvents.Updated, () => this._updateState(mapState(store.getState())));
    }
  }

  return storeAdded;
};

export default store;
