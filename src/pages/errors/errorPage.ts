import Block from '../../classes/Block.js';
import Link from '../../components/links/link.js';
// eslint-disable-next-line import/no-unresolved
import template from './errorPage.hbs?raw';
import styles from './errorPage.scss';
import { useStoreForComponent } from '../../classes/Store.js';
import { PropType } from '../../utils/types/propType.js';
import store from '../../classes/Store.js';
import { CHAT_PAGES } from '../../classes/Router.js';

export type errorPageProps = {
    header: string,
    desc: string,
};

const link: Link = useStoreForComponent(
  (state: PropType) => ({
    href: CHAT_PAGES.MESSENGER,
    text: state.bundle?.buttons.goBackToChats,
  }),
  {
    href: CHAT_PAGES.MESSENGER,
    text: store.getState().bundle?.buttons.goBackToChats,
  },
  Link,
);

export default class ErrorPage extends Block {
  constructor(props: errorPageProps) {
    super({
      ...props,
      styles,
      link,
      template,
    });
  }

  protected static _template: string = template;
}
