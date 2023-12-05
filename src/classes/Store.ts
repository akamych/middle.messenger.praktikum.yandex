import EventBus from './EventBus.ts';
import Block from './Block.ts';
import { PropType } from '../utils/types/propType.ts';
import { StateMapper } from '../utils/types/stateMapper.ts';
import set from '../utils/functions/set.ts';
import pages from '../utils/bundle/pagesData.json';
import bundle from '../utils/bundle/text.json';
import inputTypes from '../utils/bundle/inputTypes.json';
import errorsText from '../utils/bundle/errorsText.json';

export enum StoreEvents {
    // eslint-disable-next-line no-unused-vars
    Updated = 'updated',
}

class Store extends EventBus {
  private state: PropType = {
    bundle: {
      ...bundle,
      pages,
      inputTypes,
      errorsText,
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
export const useStore = (mapState: StateMapper) => (BlockClass: typeof Block) => {
  const initialState: PropType = mapState(store.getState());

  class storeAdded extends BlockClass {
    constructor(props: any) {
      super(props, initialState);
      store.on(StoreEvents.Updated, () => this._updateState(mapState(store.getState())));
    }
  }

  return storeAdded;
};

// eslint-disable-next-line max-len, no-unused-vars
export const useStoreForComponent = (
  mapState: StateMapper,
  props: PropType,
  BlockClass: typeof Block,
) => {
  const initialState: PropType = mapState(store.getState());

  class ComponentWithStore extends BlockClass {
    constructor(props: any) {
      super(props, initialState);
      store.on(StoreEvents.Updated, () => this._updateState(mapState(store.getState())));
    }
  }

  return new ComponentWithStore(props);
};

export default store;
