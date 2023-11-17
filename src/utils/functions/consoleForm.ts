import { validateInputData, validateInputType } from './validateInput.ts';

export default function consoleForm(event : Event) : void {
  event.stopPropagation();
  event.preventDefault();

  const formData: Record<string, string> = {};
  let errors: boolean = false;

  const form = event.target as HTMLFormElement;
  const inputs = form.querySelectorAll('input');
  if (!inputs) {
    return;
  }

  inputs.forEach((input: HTMLInputElement) => {
    if (errors) { return; }

    const { name, type, value } = input;
    const result : validateInputType = validateInputData(name, type, value);

    if (result.error === true) {
      errors = true;
      return;
    }
    formData[name] = value;
  });

  if (!errors) {
    // eslint-disable-next-line no-console
    console.log(formData);
  }
}
