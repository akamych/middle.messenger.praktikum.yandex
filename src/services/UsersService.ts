import usersApi, { changePasswordData, settingsData } from '../api/UsersApi.js';
import HTTP from '../classes/HTTP.js';
import store from '../classes/Store.js';
import Service from '../classes/Service.js';
import router, { CHAT_PAGES } from '../classes/Router.js';

class UsersService extends Service {
  search(name: string) {
    usersApi.search(name)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('usersList', {
              active: true,
              search: true,
              found: JSON.parse(data as string),
            });
            break;

          default:
            console.log({ status, data });
            store.set('usersList.found', []);
            break;
        }
      });
  }

  update(requestData: settingsData) {
    usersApi.update(requestData)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            store.set('user', {
              authorized: true,
              ...data,
            });
            router.go(CHAT_PAGES.INDEX);
            break;

          case HTTP.CODES.UNAUTHORIZED:
            store.set('user', { authorized: false });
            router.guestRedirect();
            break;

          default:
            break;
        }
      })
      .catch((error) => console.error(error));
  }

  updatePassword(requestData: changePasswordData) {
    usersApi.updatePassword(requestData)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            router.go(CHAT_PAGES.INDEX);
            store.set('errors.passwordPage', { active: false });
            break;

          case HTTP.CODES.BAD_REQUEST:
            store.set('errors.passwordPage', {
              active: true,
              text: data.reason,
            });
            break;

          case HTTP.CODES.UNAUTHORIZED:
            store.set('user', { authorized: false });
            router.guestRedirect();
            break;

          default:
            break;
        }
      })
      .catch((error) => console.error(error));
  }

  updateAvatar(requestData: FormData) {
    usersApi.updateAvatar(requestData)
      .then((response) => {
        if (!response) { return; }
        const { status, data } = this._createResponse(response);

        switch (status) {
          case HTTP.CODES.SUCCESS:
            router.go(CHAT_PAGES.INDEX);
            store.set('user', {
              authorized: true,
              ...data,
            });
            store.set('errors.passwordPage', { active: false });
            store.set('errors.settingsPage', { active: false });
            break;

          case HTTP.CODES.BAD_REQUEST:
            store.set('errors.passwordPage', {
              active: true,
              text: data.reason,
            });
            store.set('errors.settingsPage', {
              active: true,
              text: data.reason,
            });
            break;

          case HTTP.CODES.UNAUTHORIZED:
            store.set('user', { authorized: false });
            router.guestRedirect();
            break;

          default:
            break;
        }
      })
      .catch((error) => console.error(error));
  }
}

export default new UsersService();