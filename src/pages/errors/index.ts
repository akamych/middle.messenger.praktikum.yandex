import Block from '../../classes/Block.ts';
import Link from '../../components/links/link.ts';
// eslint-disable-next-line import/no-unresolved
import textBundle from '../../../utils/bundle/text.json';
// eslint-disable-next-line import/no-unresolved
import pagesData from '../../../utils/bundle/pagesData.json';
// eslint-disable-next-line import/no-unresolved
import template from './errors.hbs?raw';
import styles from './errors.scss';

type errorPageProps = {
    header: string,
    desc: string,
};

export default class ErrorPage extends Block {
  constructor(props: errorPageProps) {
    super({
      ...props,
      styles,
      link: new Link(
        {
          href: pagesData.index.link,
          text: textBundle.buttons.goBackToChats,
        },
      ),
      template,
    });
  }

  protected static _template: string = template;
}
