import Block from './classes/Block.ts';
import footer from './components/asides/footer/index.ts';
import header from './components/asides/header/index.ts';
import chatPage from './components/pages/chat/index.ts';
import error404Page from './components/pages/errors/404/index.ts';
import error500Page from './components/pages/errors/500/index.ts';
import loginPage from './components/pages/forms/login/index.ts';
import settingsPage from './components/pages/forms/settings/index.ts';
import signupPage from './components/pages/forms/signup/index.ts';

function renderPage(block: Block) : void {
  const appElement : HTMLElement = document.querySelector('body');
  appElement.innerHTML = '';

  if (block !== chatPage) {
    appElement.appendChild(header.getContent());
  }

  appElement.appendChild(block.getContent());

  if (block !== chatPage) {
    appElement.appendChild(footer.getContent());
  }
}

document.addEventListener('DOMContentLoaded', () : void => {
  const location : string = window.location.pathname.substring(1).toLowerCase();
  let renderBlock = null;

  switch (location) {
    case '':
    case 'index.html':
      renderBlock = chatPage;
      break;

    case 'settings.html':
      renderBlock = settingsPage;
      break;

    case 'signup.html':
      renderBlock = signupPage;
      break;

    case 'login.html':
      renderBlock = loginPage;
      break;

    case '500.html':
      renderBlock = error500Page;
      break;

    default:
      renderBlock = error404Page;
      break;
  }

  renderPage(renderBlock);
});
