import FormPage, { formPageInputProps } from '../formPage.ts';
import Button from '../../../components/inputs/button/button.ts';
import { propType } from '../../../utils/types/propType.ts';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.ts';
import Block from '../../../classes/Block.ts';
import checkForm from '../../../utils/functions/checkForm.ts';
import { formData } from '../../../utils/types/formData.ts';
import { settingsData } from '../../../api/User.ts';
import usersService from '../../../services/UsersService.js';
import authService from '../../../services/AuthService.js';
import Link from '../../../components/links/link.ts';

class SettingsPage extends FormPage {
  protected _addChildren(props: propType): propType {
    const formInputs: formPageInputProps[] = [
      { type: 'email' },
      { type: 'phone' },
      { type: 'login' },
      { type: 'display_name' },
      { type: 'first_name' },
      { type: 'second_name' },
    ];

    const inputs: Block[] = this._createInputs(formInputs);

    const buttons: Block[] = [
      useStoreForComponent(
        (state: propType) => ({
          className: 'important',
          type: 'submit',
          text: state.bundle?.buttons?.save,
        }),
        {
          className: 'important',
          type: 'submit',
          text: store.getState().bundle?.buttons?.save,
        },
        Button,
      ),
    ];

    const link = useStoreForComponent(
      (state: propType) => ({
        href: state.bundle?.pages?.logout.link,
        text: state.bundle?.pages?.logout.title,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            authService.logout();
          },
        },
      }),
      {
        href: store.getState().bundle?.pages?.logout.link,
        text: store.getState().bundle?.pages?.logout.title,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            authService.logout();
          },
        },
      },
      Link,
    );

    const sendForm = (data: formData) => {
      if (data === null) {
        return;
      }

      const requestData: settingsData = {
        display_name: data.display_name,
        first_name: data.first_name,
        second_name: data.second_name,
        login: data.login,
        email: data.email,
        phone: data.phone,
      };

      usersService.update(requestData);
    };

    const updatedProps = props;

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
  header: state.bundle.pages.settings.title,
  errors: state.errors?.settingsForm,
}));

export default useStoreImpl(SettingsPage);
