import errorLabels from '../constants/errors.json';

export type validateInputType = {
  error: boolean,
  message?: string,
};

function checkValuePresence(value: string) : boolean {
  return !value || value.length === 0;
}

function valueAbsentError() : validateInputType {
  return { error: true, message: errorLabels.any.absent };
}

function validateEmail(value : string) : validateInputType {
  if (checkValuePresence(value)) {
    return valueAbsentError();
  }
  // eslint-disable-next-line max-len
  const error = !/[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+@[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+\.[A-Za-z]+$/.test(value);
  const message = error ? errorLabels.email.wrong : undefined;
  return { error, message };
}

function validatePhone(value : string) : validateInputType {
  if (checkValuePresence(value)) {
    return valueAbsentError();
  }
  const error = !/[0-9]{10,15}$/.test(value.replace('+', ''));
  const message = error ? errorLabels.phone.wrong : undefined;
  return { error, message };
}

function validateLogin(value : string) : validateInputType {
  if (checkValuePresence(value)) {
    return valueAbsentError();
  }
  let error = !/[A-Za-z0-9-_]{3,20}$/.test(value);
  let message = errorLabels.login.wrong;

  if (error) {
    return { error, message };
  }

  error = /[0-9-_]{3,20}$/.test(value);
  message = error ? errorLabels.login.onlyNumbers : undefined;
  return { error, message };
}

function validateMessage(value : string) : validateInputType {
  if (checkValuePresence(value)) {
    return valueAbsentError();
  }
  return { error: false };
}

function validateNames(value : string) : validateInputType {
  if (checkValuePresence(value)) {
    return valueAbsentError();
  }
  let error = !/[A-Za-zА-Яа-я-]+$/.test(value);
  let message = errorLabels.names.wrong;

  if (error) {
    return { error, message };
  }

  error = value.charAt(0) !== value.charAt(0).toUpperCase();
  message = error ? errorLabels.names.capital : undefined;
  return { error, message };
}

function validatePassword(value : string) : validateInputType {
  if (checkValuePresence(value)) {
    return valueAbsentError();
  }
  let error = value.length > 40 || value.length < 8;
  let message = errorLabels.password.length;

  if (error) {
    return { error, message };
  }

  error = value === value.toLowerCase();
  message = errorLabels.password.capital;

  if (error) {
    return { error, message };
  }

  error = !/[0-9]$/.test(value);
  message = error ? errorLabels.password.noDigits : undefined;
  return { error, message };
}

export function validateInputData(name: string, type: string, value?: string) : validateInputType {
  switch (type.toLowerCase()) {
    case 'email': return validateEmail(value);
    case 'tel': return validatePhone(value);
    case 'password': return validatePassword(value);

    case 'text':
      switch (name.toLowerCase()) {
        case 'login':
        case 'display_name':
          return validateLogin(value);
        case 'first_name':
        case 'second_name':
          return validateNames(value);
        case 'message':
          return validateMessage(value);
        case 'feedSearch':
          return { error: false };
        default: return { error: false };
      }

    default: return { error: false };
  }
}

export function validateInput(event : Event) : validateInputType {
  const { target } = event;
  const { name, type, value } = target as HTMLInputElement;
  return validateInputData(name, type, value);
}
