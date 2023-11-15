import Block from '../../../classes/Block.ts';
import BackLink from '../../links/backLink/index.ts';
import textBundle from '../../../utils/constants/text.json';
import pagesData from '../../../utils/constants/pagesData.json';
import template from './errors.hbs?raw';
import styles from './errors.scss';

type errorPageProps = {
    header: string,
    desc: string,
};

export default class ErrorPage extends Block {
  constructor(props: errorPageProps) {
    super('main', {
      ...props,
      styles,
      backLink: new BackLink(
        {
          href: pagesData.index.link,
          text: textBundle.buttons.goBackToChats,
        },
      ),
    }, template);
  }
}
