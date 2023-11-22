import Block, { propType } from './Block.ts';

export default class Route {
  private _pathname: string;

  // eslint-disable-next-line no-unused-vars
  private _blockClass: typeof Block;

  private _block: Block | null;

  private _props: propType;

  private _template: string;

  constructor(pathname: string, view: typeof Block, props: propType) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._template = view.getTemplate();
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({
        ...this._props,
        template: this._blockClass.getTemplate(),
      });
      this.renderDom(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }

  renderDom(query: string, block: Block) {
    const root = document.querySelector(query);
    if (!root || block.getContent() === null) {
      return;
    }
    root.appendChild(block.getContent() as HTMLElement);
  }
}
