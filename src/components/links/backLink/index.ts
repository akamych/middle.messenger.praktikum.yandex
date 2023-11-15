import Block from '../../../classes/Block.ts';
import template from './backLink.hbs';

type backLinkPropsType = {
  href: string,
  text: string,
};

export default class BackLink extends Block {
  constructor(props: backLinkPropsType) {
    super('a', {
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
