import FormPage, { formPageInputProps } from '../formPage.ts';
import Button from '../../../components/inputs/button/button.ts';
import { propType } from '../../../utils/types/propType.ts';
import checkForm from '../../../utils/functions/checkForm.ts';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.ts';
import Block from '../../../classes/Block.ts';
import Link from '../../../components/links/link.ts';
import { loginData } from '../../../api/AuthApi.ts';
import authService from '../../../services/AuthService.ts';
import { formData } from '../../../utils/types/formData.ts';

class LoginPage extends FormPage {
  protected _addChildren(props: propType): propType {
    const formInputs: formPageInputProps[] = [
      { type: 'login' },
      { type: 'password' },
    ];

    const inputs: Block[] = this._createInputs(formInputs);

    const buttons: Block[] = [
      useStoreForComponent(
        (state: propType) => ({
          className: 'important',
          type: 'submit',
          text: state.bundle?.buttons?.login,
        }),
        {
          className: 'important',
          type: 'submit',
          text: store.getState().bundle?.buttons?.login,
        },
        Button,
      ),
    ];

    const link = useStoreForComponent(
      (state: propType) => ({
        href: state.bundle?.pages?.signup.link,
        text: state.bundle?.pages?.signup.title,
      }),
      {
        href: store.getState().bundle?.pages?.signup.link,
        text: store.getState().bundle?.pages?.signup.title,
      },
      Link,
    );

    const updatedProps = props;

    const sendForm = (data: formData) => {
      if (data === null) {
        return;
      }

      const requestData: loginData = {
        login: data.login,
        password: data.password,
      };

      authService.login(requestData);
    };

    updatedProps.events = {
      ...updatedProps.events,
      submit: (event: Event) => sendForm(checkForm(event)),
    };

    return {
      ...updatedProps,
      inputs,
      buttons,
      link,
    };
  }
}

const useStoreImpl = useStore((state) => ({
  header: state.bundle.pages.login.title,
  errors: state.errors?.loginForm,
}));

export default useStoreImpl(LoginPage);
