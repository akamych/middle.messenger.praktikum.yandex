import { formData } from '../types/formData.ts';
import { validateInputData, validateInputType } from './validateInput.ts';

export default function checkForm(event : Event) : formData {
  event.stopPropagation();
  event.preventDefault();

  let data: formData = null;
  let errors: boolean = false;

  const form = event.target as HTMLFormElement;
  const inputs = form.querySelectorAll('input');
  if (!inputs) {
    return data;
  }

  data = {};

  inputs.forEach((input: HTMLInputElement) => {
    const { name, type, value } = input;
    const result : validateInputType = validateInputData(name, type, value);
    if (result.error === true) {
      input.dispatchEvent(new Event('blur'));
      errors = true;
    }
    data![name] = value;
  });

  return (!errors) ? data : null;
}
