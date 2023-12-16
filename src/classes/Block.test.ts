/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import Block from './Block.ts';
import { PropType } from '../utils/types/propType.ts';

describe('Block', () => {
  const testHandleBarsString: string = '<div id="TestBlockId">{{ text }}</div>';
  // test component without emit method called in set method
  class TestBlock extends Block {
    constructor(props: PropType) {
      super({
        ...props,
        template: testHandleBarsString,
      });
    }

    protected static _template: string = testHandleBarsString;
  }

  let component: Block;

  it('renders basically', () => {
    component = new TestBlock({});

    expect(component.getContent()?.id).to.eq('TestBlockId');
  });

  it('renders with props', () => {
    const testData: string = 'testing texting';

    component = new TestBlock({ text: testData });

    expect(component.getContent()?.textContent).to.eq(testData);
  });

  it('re-renders', () => {
    const testData: string = 'testing texting';
    const newTestData: string = 'testing texting';

    component = new TestBlock({ text: testData });
    component.setProps({ text: newTestData });

    expect(component.getContent()?.textContent).to.eq(newTestData);
  });

  it('has empty state after render', () => {
    component = new TestBlock({});

    expect(component.getState()).deep.be.empty;
  });

  it('updates state correctly', () => {
    const testData: string = 'testing texting';

    component = new TestBlock({});
    component._updateState({ text: testData });

    expect(component.getContent()?.textContent).to.eq(testData);
  });
});
