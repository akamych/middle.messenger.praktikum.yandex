/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Store } from './Store.ts';
import pages from '../utils/bundle/pagesData.json' assert { type: 'json' };
import bundle from '../utils/bundle/text.json' assert { type: 'json' };
import inputTypes from '../utils/bundle/inputTypes.json' assert { type: 'json' };
import errorsText from '../utils/bundle/errorsText.json' assert { type: 'json' };
import set from '../utils/functions/set.ts';

describe('Store', () => {
  // test component without emit method called in set method
  class TestStore extends Store {
    public set(path: string, value: unknown) {
      set(this.state, path, value);
    }
  }

  let store: Store | TestStore;

  // initial language bundle kept in store
  const initialState = {
    bundle: {
      ...bundle,
      pages,
      inputTypes,
      errorsText,
    },
  };

  it('contains only bundle on startup', () => {
    store = new Store();
    expect(store!.getState()).deep.equals(initialState);
  });

  it('set method works fine', () => {
    store = new TestStore();
    const testData: Record<string, string | number | null | undefined> = {
      testString: 'test',
      testNumber: 123,
      testNull: null,
      testUndefined: undefined,
    };

    store.set('test', testData);

    expect(store!.getState()).deep.equals({
      ...initialState,
      test: testData,
    });
  });
});
