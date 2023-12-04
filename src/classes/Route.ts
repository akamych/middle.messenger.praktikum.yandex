import Block, { propType } from './Block.ts';
import { ACCESS_LEVELS } from './Router.ts';

export default class Route {
  private _pathname: string;

  // eslint-disable-next-line no-unused-vars
  private _blockClass: typeof Block;

  private _block: Block | null;

  private _props: propType;

  private _template: string;

  private _accessLevel: string;

  constructor(pathname: string, view: typeof Block, props: propType) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._template = view.getTemplate();
    this._props = props;
    this._accessLevel = (props.accessLevel) ? props.accessLevel : ACCESS_LEVELS.ALL;
  }

  getAccessLevel() : string {
    return this._accessLevel;
  }

  navigate(pathname: string) : void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() : void {
    if (this._block) {
      this._block = null;
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render() : void {
    if (!this._block) {
      this._block = new this._blockClass({
        ...this._props,
        template: this._blockClass.getTemplate(),
      });
      this.renderDom(this._props.rootQuery, this._block);
    }

    // this._block.show();
  }

  renderDom(query: string, block: Block) : void {
    const root = document.querySelector(query);
    if (!root || block.getContent() === null) {
      return;
    }
    root.replaceWith(block.getContent() as HTMLElement);
  }
}
