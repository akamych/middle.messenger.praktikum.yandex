import FormPage from '../index.ts';
import Input from '../../../inputs/input/index.ts';
import Button from '../../../inputs/button/index.ts';
import textBundle from '../../../../utils/constants/text.json';
import pagesData from '../../../../utils/constants/pagesData.json';
import myTestData from '../../../../utils/tests/myData.json';

const inputEmail = new Input({
  type: 'email',
  name: 'email',
  label: textBundle.labels.email,
  value: myTestData.email,
});

const inputPhone = new Input({
  type: 'tel',
  name: 'phone',
  label: textBundle.labels.phone,
  value: myTestData.phone,
});

const inputLogin = new Input({
  type: 'text',
  name: 'login',
  label: textBundle.labels.login,
  value: myTestData.login,
});

const inputDisplayName = new Input({
  type: 'text',
  name: 'display_name',
  label: textBundle.labels.display_name,
  value: myTestData.display_name,
});

const inputFirstName = new Input({
  type: 'text',
  name: 'first_name',
  label: textBundle.labels.first_name,
  value: myTestData.first_name,
});

const inputLastName = new Input({
  type: 'text',
  name: 'second_name',
  label: textBundle.labels.second_name,
  value: myTestData.second_name,
});

const inputOldPassword = new Input({
  type: 'password',
  name: 'password',
  label: textBundle.labels.oldPassword,
});

const inputNewPassword = new Input({
  type: 'password',
  name: 'passwordConfirmation',
  label: textBundle.labels.newPassword,
});

const buttonSubmit = new Button({
  className: 'important',
  type: 'submit',
  text: textBundle.buttons.save,
});

const props = {
  header: pagesData.settings.title,
  inputs: [
    inputEmail,
    inputPhone,
    inputLogin,
    inputDisplayName,
    inputFirstName,
    inputLastName,
    inputOldPassword,
    inputNewPassword,
  ],
  buttons: [buttonSubmit],
};

const settingsPage = new FormPage(props);

export default settingsPage;
