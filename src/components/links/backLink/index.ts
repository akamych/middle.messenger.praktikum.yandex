import Block from '../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './backLink.hbs?raw';

type backLinkPropsType = {
  href: string,
  text: string,
};

export default class BackLink extends Block {
  constructor(props: backLinkPropsType) {
    super({
      ...props,
      events: {
        click: (event) => {
          event.stopPropagation();
          event.preventDefault();
          // пока нет роутера, жесткий редирект
          window.location.href = props.href;
        },
      },
    }, template);
  }
}
