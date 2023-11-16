import FormPage from '../index.ts';
import Input from '../../../inputs/input/index.ts';
import Button from '../../../inputs/button/index.ts';
import BackLink from '../../../links/backLink/index.ts';
import textBundle from '../../../../utils/constants/text.json';
import pagesData from '../../../../utils/constants/pagesData.json';
import consoleForm from '../../../../utils/functions/consoleForm.ts';

const inputEmail = new Input({
  type: 'email',
  name: 'email',
  label: textBundle.labels.email,
});

const inputPhone = new Input({
  type: 'tel',
  name: 'phone',
  label: textBundle.labels.phone,
});

const inputLogin = new Input({
  type: 'text',
  name: 'login',
  label: textBundle.labels.login,
});

const inputFirstName = new Input({
  type: 'text',
  name: 'first_name',
  label: textBundle.labels.first_name,
});

const inputLastName = new Input({
  type: 'text',
  name: 'second_name',
  label: textBundle.labels.second_name,
});

const inputPassword = new Input({
  type: 'password',
  name: 'password',
  label: textBundle.labels.password,
});

const inputPasswordConfirmation = new Input({
  type: 'password',
  name: 'passwordConfirmation',
  label: textBundle.labels.passwordConfirmation,
});

const buttonSubmit = new Button({
  className: 'important',
  type: 'submit',
  text: textBundle.buttons.signup,
});

const backLink = new BackLink({
  href: pagesData.login.link,
  text: pagesData.login.title,
});

const props = {
  header: textBundle.buttons.signup,
  inputs: [
    inputEmail,
    inputPhone,
    inputLogin,
    inputFirstName,
    inputLastName,
    inputPassword,
    inputPasswordConfirmation,
  ],
  buttons: [buttonSubmit],
  backLink,
  events: {
    submit: (event) => consoleForm(event),
  },
};

const signupPage = new FormPage(props);

export default signupPage;
