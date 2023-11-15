import Block from '../../../classes/Block.ts';
// eslint-disable-next-line max-len
import { validateInput, validateInputType, validateInputData } from '../../../utils/functions/validateInput.ts';
import template from './input.hbs';

type InputPropsType = {
  type: string,
  name: string,
  placeholder?: string,
  label?: string,
  value?: string,
  events?: Record<string, Function>,
};

export default class Input extends Block {
  constructor(props: InputPropsType) {
    super('label', props, template);
    const input = this.getContent().querySelector('input');
    this._updateErrorStatus(input, validateInputData(input.name, input.type, input.value));
  }

  private _validateError: boolean = false;

  _updateErrorStatus(input: HTMLInputElement, result: validateInputType) {
    if (
      this._validateError !== result.error ||
      (this._validateError && this.props.label !== result.error)
    ) {
      this._validateError = result.error;

      this.props = {
        ...this.props,
        label: result.error ? result.message : this._meta.props.label,
        className: result.error ? 'hasError' : undefined,
        value: input.value,
      };

      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  _addSpecificEvents() {
    const input = this.getContent().querySelector('input');
    input.addEventListener('blur', (event) => {
      this._updateErrorStatus(input, validateInput(event));
    });
  }
}
