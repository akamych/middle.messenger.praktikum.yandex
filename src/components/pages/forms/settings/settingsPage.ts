import FormPage, { formPageInputProps } from '../formPage.ts';
import Button from '../../../inputs/button/index.js';
import { propType } from '../../../../utils/types/propType.js';
import { useStore } from '../../../../classes/Store.js';
import Block from '../../../../classes/Block.js';

class SettingsPage extends FormPage {
  protected _addChildren(props: propType): propType {
    const formInputs: formPageInputProps[] = [
      { type: 'email' },
      { type: 'phone' },
      { type: 'login' },
      { type: 'display_name' },
      { type: 'first_name' },
      { type: 'second_name' },
      { type: 'oldPassword' },
      { type: 'newPassword' },
    ];

    const inputs: Block[] = this._createInputs(formInputs);

    const buttons: Block[] = [
      new Button({
        className: 'important',
        type: 'submit',
        text: this.getState().buttonText,
      }),
    ];

    return {
      ...props,
      inputs,
      buttons,
    };
  }
}

const useStoreImpl = useStore((state) => ({
  header: state.bundle.pages.settings.title,
  inputTypes: state.bundle.inputTypes,
  labels: state.bundle.labels,
  buttonText: state.bundle.buttons.save,
}));

export default useStoreImpl(SettingsPage);
