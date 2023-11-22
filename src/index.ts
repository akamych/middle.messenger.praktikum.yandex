import footer from './components/asides/footer/';
import header from './components/asides/header/';
import ChatPage from './components/pages/chat/';
import Router from './classes/Router.js';
// import error404Page from './components/pages/errors/404/index.ts';
// import error500Page from './components/pages/errors/500/index.ts';
// import loginPage from './components/pages/forms/login/index.ts';
// import settingsPage from './components/pages/forms/settings/index.ts';
// import SignUpPage from './components/pages/forms/signup/index.js';

function startApp() : void {
  const router = new Router('body > main');

  router
    .use('/', ChatPage)
    .use('/messenger', ChatPage)
    // .use('/sign-up', signupPage)
    // .use('/settings', settingsPage)
    // .use('/login', loginPage)
    .start();

  const headerDom = document.querySelector('body > header');
  if (headerDom) {
    headerDom.appendChild(header.getContent())
  }

  const footerDom = document.querySelector('body > footer');
  if (footerDom) {
    footerDom.appendChild(footer.getContent())
  }
};

startApp();
