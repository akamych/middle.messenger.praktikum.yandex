import footer from './components/asides/footer/footer.ts';
import Header from './components/asides/header/header.ts';
import ChatPage from './pages/chat/chatPage.ts';
import SettingsPage from './pages/forms/settings/settingsPage.ts';
import router, { ACCESS_LEVELS, CHAT_PAGES } from './classes/Router.ts';
import authService from './services/AuthService.ts';
import LoginPage from './pages/forms/login/loginPage.ts';
import SignupPage from './pages/forms/signup/signupPage.ts';
import PasswordPage from './pages/forms/password/passwordPage.ts';
import Error404Page from './pages/errors/404/error404Page.js';
import Error500Page from './pages/errors/500/error500Page.js';

function startApp() : void {
  authService.getUserData();

  router
    .use(CHAT_PAGES.INDEX, ChatPage, ACCESS_LEVELS.GUESTS)
    .use(CHAT_PAGES.MESSENGER, ChatPage, ACCESS_LEVELS.USERS)
    .use(CHAT_PAGES.SETTINGS, SettingsPage, ACCESS_LEVELS.USERS)
    .use(CHAT_PAGES.SETTINGS_PASSWORD, PasswordPage, ACCESS_LEVELS.USERS)
    .use(CHAT_PAGES.SIGNUP, SignupPage, ACCESS_LEVELS.USERS)
    .use(CHAT_PAGES.LOGIN, LoginPage, ACCESS_LEVELS.GUESTS)
    .use(CHAT_PAGES.ERROR_404, Error404Page, ACCESS_LEVELS.ALL)
    .use(CHAT_PAGES.ERROR_500, Error500Page, ACCESS_LEVELS.ALL)
    .start();

  const header = new Header({});
  const headerDom = document.querySelector('body > header');
  if (headerDom) {
    headerDom.replaceWith(header.getContent() as HTMLElement);
  }

  const footerDom = document.querySelector('body > footer');
  if (footerDom) {
    footerDom.replaceWith(footer.getContent() as HTMLElement);
  }
}

startApp();
