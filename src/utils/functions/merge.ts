import { Indexed } from '../types/indexed.ts';

export default function merge(base: Indexed, additional: Indexed): Indexed {
  const newBase = base;
  const newAdditional = additional;

  Object.keys(newAdditional).forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(newAdditional, key)) {
      return;
    }

    try {
      if (additional[key].constructor === Object) {
        newAdditional[key] = merge(base[key] as Indexed, additional[key] as Indexed);
      } else {
        newBase[key] = additional[key];
      }
    } catch (e) {
      newBase[key] = additional[key];
    }
  });

  return newBase;
}
