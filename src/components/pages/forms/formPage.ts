import Block from '../../../classes/Block.js';
import { propType } from '../../../utils/types/propType.js';
import Input from '../../inputs/input/index.js';
// eslint-disable-next-line import/no-unresolved
import template from './formPage.hbs?raw';
import styles from './formPage.scss';

type formPageProps = {
    events?: Record<string, Function>,
    inputs: Block[],
};

export type formPageInputProps = {
  type: string,
  value?: string,
};

export default class FormPage extends Block {
  constructor(props: formPageProps, state: propType) {
    super({
      ...props,
      styles,
      template,
    }, state);
  }

  protected static _template: string = template;

  protected _createInputs(inputs: formPageInputProps[]): Block[] {
    const inputBlocks: Block[] = [];

    inputs.forEach((input: formPageInputProps) => {
      inputBlocks.push(new Input({
        ...this.getState().inputTypes[input.type],
        label: this.getState().labels[input.type],
        value: input.value,
      }));
    });

    return inputBlocks;
  }
}
