import footer from './components/asides/footer/';
import Header from './components/asides/header/';
import ChatPage from './pages/chat/chatPage.ts';
import SettingsPage from './pages/forms/settings/settingsPage.ts';
import router, { ACCESS_LEVELS, CHAT_PAGES } from './classes/Router.js';
import authService from './services/AuthService.ts';
// import error404Page from './pages/errors/404/index.ts';
// import error500Page from './pages/errors/500/index.ts';
import LoginPage from './pages/forms/login/loginPage.ts';
import SignupPage from './pages/forms/signup/signupPage.ts';
// import SignUpPage from './pages/forms/signup/index.js';

function startApp() : void {
  router
    .use(CHAT_PAGES.INDEX, ChatPage, ACCESS_LEVELS.USERS)
    .use(CHAT_PAGES.MESSENGER, ChatPage, ACCESS_LEVELS.USERS)
    .use(CHAT_PAGES.SETTINGS, SettingsPage, ACCESS_LEVELS.USERS)
    .use('/sign-up', SignupPage, ACCESS_LEVELS.GUESTS)
    .use(CHAT_PAGES.LOGIN, LoginPage, ACCESS_LEVELS.GUESTS)
    .start();

  authService.getUserData();

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
