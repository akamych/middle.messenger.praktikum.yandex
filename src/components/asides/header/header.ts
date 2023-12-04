import Block from '../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './header.hbs?raw';
import styles from './header.scss';
import { useStore } from '../../../classes/Store.ts';
import { PropType } from '../../../utils/types/propType.ts';
import router, { CHAT_PAGES } from '../../../classes/Router.ts';

type headerPropsType = {
    href: string,
    text: string,
    title: string,
};

class Header extends Block {
  constructor(props: headerPropsType, state: PropType) {
    super({
      ...props,
      ...state,
      styles,
      template,
      events: {
        click: (event : Event) => {
          event.preventDefault();
          router.go(CHAT_PAGES.MESSENGER);
        },
      },
    }, state);
  }

  protected static _template: string = template;
}

const useStoreImpl = useStore((state) => ({
  href: state.bundle.pages.index.link,
  title: state.bundle.pages.index.title,
  text: state.bundle.headerLink,
}));

export default useStoreImpl(Header);
