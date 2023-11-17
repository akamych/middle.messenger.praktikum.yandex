import FormPage from '../index.ts';
import Input from '../../../inputs/input/index.ts';
import Button from '../../../inputs/button/index.ts';
import BackLink from '../../../links/backLink/index.ts';
import textBundle from '../../../../utils/constants/text.json';
import pagesData from '../../../../utils/constants/pagesData.json';
import consoleForm from '../../../../utils/functions/consoleForm.ts';

const inputLogin = new Input({
  type: 'text',
  name: 'login',
  label: textBundle.labels.login,
});

const inputPassword = new Input({
  type: 'password',
  name: 'password',
  label: textBundle.labels.password,
});

const buttonSubmit = new Button({
  className: 'important',
  type: 'submit',
  text: textBundle.buttons.login,
});

const backLink = new BackLink({
  href: pagesData.signup.link,
  text: pagesData.signup.title,
});

const props = {
  header: textBundle.buttons.login,
  inputs: [inputLogin, inputPassword],
  buttons: [buttonSubmit],
  backLink,
  events: {
    submit: (event) => consoleForm(event),
  },
};

const loginPage = new FormPage(props);

export default loginPage;
