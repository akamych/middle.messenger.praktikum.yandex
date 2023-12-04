import Block from '../../classes/Block.ts';
import router from '../../classes/Router.ts';
import { propType } from '../../utils/types/propType.ts';
// eslint-disable-next-line import/no-unresolved
import template from './link.hbs?raw';

type linkPropsType = {
  href: string,
  title?: string,
  text: string,
  events?: propType,
};

export default class Link extends Block {
  constructor(props: linkPropsType) {
    const updatedProps = props;

    updatedProps.events = {
      ...props.events,
    };

    if (!updatedProps.events.click) {
      updatedProps.events.click = (event: Event) => {
        event.stopPropagation();
        event.preventDefault();
        router.go(this._props.href);
      };
    }

    super({
      ...updatedProps,
      template,
    });
  }

  protected static _template: string = template;
}
