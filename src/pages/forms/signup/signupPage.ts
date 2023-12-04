import FormPage, { formPageInputProps } from '../formPage.ts';
import Button from '../../../components/inputs/button/button.ts';
import { propType } from '../../../utils/types/propType.ts';
import checkForm from '../../../utils/functions/checkForm.ts';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.ts';
import Block from '../../../classes/Block.ts';
import Link from '../../../components/links/link.ts';
import { signupData } from '../../../api/AuthApi.ts';
import authService from '../../../services/AuthService.ts';
import { formData } from '../../../utils/types/formData.ts';

class SignupPage extends FormPage {
  protected _addChildren(props: propType): propType {
    const formInputs: formPageInputProps[] = [
      { type: 'email' },
      { type: 'phone' },
      { type: 'login' },
      { type: 'first_name' },
      { type: 'second_name' },
      { type: 'password' },
      { type: 'passwordConfirmation' },
    ];

    const inputs: Block[] = this._createInputs(formInputs);

    const buttons: Block[] = [
      useStoreForComponent(
        (state: propType) => ({
          className: 'important',
          type: 'submit',
          text: state.bundle?.buttons?.signup,
        }),
        {
          className: 'important',
          type: 'submit',
          text: store.getState().bundle?.buttons?.signup,
        },
        Button,
      ),
    ];

    const link = useStoreForComponent(
      (state: propType) => ({
        href: state.bundle?.pages?.login.link,
        text: state.bundle?.pages?.login.title,
      }),
      {
        href: store.getState().bundle?.pages?.login.link,
        text: store.getState().bundle?.pages?.login.title,
      },
      Link,
    );

    const updatedProps = props;

    const sendForm = (data: formData) => {
      if (data === null) {
        return;
      }

      const requestData: signupData = {
        first_name: data.first_name,
        second_name: data.second_name,
        login: data.login,
        email: data.email,
        password: data.password,
        phone: data.phone,
      };

      authService.signup(requestData);
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
  header: state.bundle.pages.signup.title,
  errors: state.errors?.signupForm,
}));

export default useStoreImpl(SignupPage);
