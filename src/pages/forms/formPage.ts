import Block from '../../classes/Block.ts';
import store, { useStoreForComponent } from '../../classes/Store.ts';
import { propType } from '../../utils/types/propType.ts';
import Input from '../../components/inputs/input/input.ts';
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
  protected _display: string = 'grid';

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

    // так как все formPage - это или гостевые, или настройки пользователя
    // то привяжем их всех к пользователю в сторе
    inputs.forEach((input: formPageInputProps) => {
      inputBlocks.push(
        useStoreForComponent(
          (state: propType) => ({
            ...state.bundle.inputTypes[input.type],
            label: state.bundle.labels[input.type],
            value: state.user?.authorized ? state.user[input.type] : null,
          }),
          {
            ...store.getState().bundle?.inputTypes[input.type],
            label: store.getState().bundle?.labels[input.type],
            value: store.getState().user?.authorized ? store.getState().user[input.type] : null,
          },
          Input,
        ),
      );
    });

    return inputBlocks;
  }
}
