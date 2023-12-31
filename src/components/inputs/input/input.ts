import Block from '../../../classes/Block.ts';
// eslint-disable-next-line max-len
import { validateInput, validateInputType, validateInputData } from '../../../utils/functions/validateInput.ts';
// eslint-disable-next-line import/no-unresolved
import template from './input.hbs?raw';

export type InputPropsType = {
  type: string,
  name: string,
  placeholder?: string,
  label?: string,
  value?: string,
  events?: Record<string, Function>,
};

export default class Input extends Block {
  constructor(props: InputPropsType) {
    const updatedProps = props;

    // добавляем блёровскую проверку на все инпуты,
    // если специфическая не указана в пропсах
    if (!props.events || !props.events.blur) {
      updatedProps.events = {
        ...props.events,
        blur: (event: Event) => {
          event.stopPropagation();
          this._updateErrorStatus(validateInput(event));
        },
      };
    }

    // ставим лэйбл плейсхолдером, если его нет
    if (!props.placeholder) {
      updatedProps.placeholder = props.label;
    }

    super({
      ...updatedProps,
      template,
    });

    if (props.value) {
      const input = this.getContent()?.querySelector('input');
      if (input) {
        this._updateErrorStatus(validateInputData(input.name, input.type, input.value));
      }
    }
  }

  private _validateError: boolean = false;

  _updateErrorStatus(result: validateInputType) {
    if (
      this._validateError !== result.error
      || (this._validateError && this._props.label !== result.error)
    ) {
      this._validateError = result.error;

      const input = this.getContent()?.querySelector('input');
      this._props = {
        ...this._props,
        label: result.error ? result.message : this._props.label,
        className: result.error ? 'hasError' : undefined,
        value: input?.value,
      };

      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }
}
