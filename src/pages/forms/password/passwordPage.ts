import FormPage, { formPageInputProps } from '../formPage.js';
import Button from '../../../components/inputs/button/button.js';
import { propType } from '../../../utils/types/propType.js';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.js';
import Block from '../../../classes/Block.js';
import checkForm from '../../../utils/functions/checkForm.js';
import { formData } from '../../../utils/types/formData.js';
import { settingsData } from '../../../api/User.ts';
import usersService from '../../../services/UsersService.js';
import Link from '../../../components/links/link.js';
import logoutLink from '../../../components/links/settingsPage/logout.js';
import avatarLink from '../../../components/links/settingsPage/avatar.js';
import router, { CHAT_PAGES } from '../../../classes/Router.js';

class PasswordPage extends FormPage {
  protected _addChildren(props: propType): propType {
    const formInputs: formPageInputProps[] = [
      { type: 'oldPassword' },
      { type: 'newPassword' },
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

    const dataMapper = (state: propType) => ({
      href: '#',
      text: state.bundle?.buttons?.changeData,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          router.go(CHAT_PAGES.SETTINGS);
        },
      },
    });

    const dataLink = useStoreForComponent(
      dataMapper,
      dataMapper(store.getState()),
      Link,
    );

    const headerLinks = [avatarLink, dataLink];

    const sendForm = (data: formData) => {
      if (data === null) {
        return;
      }

      if (data.oldPassword === data.newPassword) {
        store.set('errors.passwordPage', {
          active: true,
          text: store.getState().bundle?.errorsText?.passwordForm.samePasswords,
        });
        return;
      }

      const requestData: settingsData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };

      usersService.updatePassword(requestData);
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
  errors: state.errors?.passwordPage,
  changeAvatar: state.changeAvatar,
  changePassword: state.changePassword,
}));

export default useStoreImpl(PasswordPage);
