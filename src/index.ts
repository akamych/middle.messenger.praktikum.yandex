import footer from './components/asides/footer/';
import Header from './components/asides/header/';
import ChatPage from './components/pages/chat/';
import router from './classes/Router.js';
// import error404Page from './components/pages/errors/404/index.ts';
// import error500Page from './components/pages/errors/500/index.ts';
// import loginPage from './components/pages/forms/login/index.ts';
// import settingsPage from './components/pages/forms/settings/index.ts';
// import SignUpPage from './components/pages/forms/signup/index.js';

function startApp() : void {
  router
    .use('/', ChatPage)
    .use('/messenger', ChatPage)
    // .use('/sign-up', signupPage)
    // .use('/settings', settingsPage)
    // .use('/login', loginPage)
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
