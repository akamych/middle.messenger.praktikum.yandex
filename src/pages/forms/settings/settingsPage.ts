import FormPage, { formPageInputProps } from '../formPage.ts';
import Button from '../../../components/inputs/button/button.ts';
import { propType } from '../../../utils/types/propType.ts';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.ts';
import Block from '../../../classes/Block.ts';
import checkForm from '../../../utils/functions/checkForm.ts';
import { formData } from '../../../utils/types/formData.ts';
import { settingsData } from '../../../api/UsersApi.ts';
import usersService from '../../../services/UsersService.ts';
import Link from '../../../components/links/link.ts';
import logoutLink from '../../../components/links/settingsPage/logout.ts';
import avatarLink from '../../../components/links/settingsPage/avatar.ts';
import router, { CHAT_PAGES } from '../../../classes/Router.ts';

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

    const passwordMapper = (state: propType) => ({
      href: '#',
      text: state.bundle?.buttons?.changePassword,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          router.go(CHAT_PAGES.SETTINGS_PASSWORD);
        },
      },
    });

    const passwordLink = useStoreForComponent(
      passwordMapper,
      passwordMapper(store.getState()),
      Link,
    );

    const headerLinks = [avatarLink, passwordLink];

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
      headerLinks,
      inputs,
      buttons,
      link: logoutLink,
    };
  }
}

const useStoreImpl = useStore((state) => ({
  header: state.bundle.pages.settings.title,
  errors: state.errors?.settingsPage,
  changeAvatar: state.changeAvatar,
  changePassword: state.changePassword,
}));

export default useStoreImpl(SettingsPage);
