import FormPage, { formPageInputProps } from '../formPage.ts';
import Button from '../../../inputs/button/index.js';
import { propType } from '../../../../utils/types/propType.js';
import { useStore } from '../../../../classes/Store.js';
import Block from '../../../../classes/Block.js';
import BackLink from '../../../links/backLink/backLink.ts'

class LoginPage extends FormPage {
  protected _addChildren(props: propType): propType {
    const formInputs: formPageInputProps[] = [
      { type: 'login' },
      { type: 'password' },
    ];

    const inputs: Block[] = this._createInputs(formInputs);

    const buttons: Block[] = [
      new Button({
        className: 'important',
        type: 'submit',
        text: this.getState().buttonText,
      }),
    ];

    console.log(this.getState());
    const backLink = new BackLink({
      href: this.getState().backLink.href,
      text: this.getState().backLink.title,
    });

    return {
      ...props,
      inputs,
      buttons,
      backLink,
    };
  }
}

const useStoreImpl = useStore((state) => ({
  header: state.bundle.pages.login.title,
  inputTypes: state.bundle.inputTypes,
  labels: state.bundle.labels,
  buttonText: state.bundle.buttons.login,
  backLink: {
    href: state.bundle.pages.signup.link,
    text: state.bundle.pages.signup.title,
  },
}));

export default useStoreImpl(LoginPage);
