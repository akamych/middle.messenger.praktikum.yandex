import textBundle from '../../../utils/bundle/text.json';
import Block from '../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './footer.hbs?raw';
import styles from './footer.scss';

type footerPropsType = {
    href: string,
    text: string,
};

class Footer extends Block {
  constructor(props: footerPropsType) {
    super({
      ...props,
      styles,
      template,
    });
  }

  protected static _template: string = template;
}

const footerProps = {
  href: textBundle.akamych.link,
  text: textBundle.akamych.text,
};

const footer = new Footer(footerProps);

export default footer;
