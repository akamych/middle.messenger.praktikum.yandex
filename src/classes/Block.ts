import { v4 as makeUUID } from 'uuid';
import HandleBars from 'handlebars';
import EventBus from './EventBus.ts';
import isEqual from '../utils/functions/isEqual.ts';
import { propType } from '../utils/types/propType.js';

// eslint-disable-next-line no-use-before-define
type childType = Block[];

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id: string;

  protected _eventBus: () => EventBus;

  protected _element: HTMLElement | null = null;

  protected _children: childType = [];

  protected _props: propType = {};

  protected _state: propType = {};

  protected static _template: string = '';

  protected _display: string = 'block';

  public static getTemplate() : string {
    return this._template;
  }

  protected _addChildren(props: propType): propType {
    return props;
  }

  constructor(props: propType, state: propType = {}) {
    this.id = makeUUID();

    const eventBus = new EventBus();
    this._eventBus = () => eventBus;
    this._state = state;
    const updatedProps: propType = this._addChildren(props);
    this._props = this._makePropsProxy(updatedProps);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) : void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources(tagName : string = 'div'): HTMLElement {
    return document.createElement(tagName);
  }

  init() : void {
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() : void {
    this.componentDidMount();
  }

  componentDidMount() : void {}

  dispatchComponentDidMount() : void {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: propType, newProps: propType) : void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: propType, newProps: propType) : boolean {
    return !isEqual(oldProps, newProps);
  }

  _updateState(newState: propType) : void {
    if (newState && this.componentDidUpdate(this._state, newState)) {
      this._state = newState;
      this._props = {
        ...this._props,
        ...newState,
      };
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  getState(): propType {
    return this._state;
  }

  setProps = (nextProps: propType) : void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this._props, nextProps);
  };

  get element() : HTMLElement | null {
    return this._element;
  }

  _render() : void {
    this._removeEvents();
    const newFragment = this.compile();
    const newElement = newFragment.firstElementChild as HTMLElement;
    if (this._element === null) {
      this._element = this._createResources();
    }
    this._element.innerHTML = '';
    this._element.replaceWith(newElement);
    this._element = newElement;
    this._addEvents();
  }

  render() : string {
    return this._props.template;
  }

  getContent() : HTMLElement | null {
    return this._element;
  }

  _addEvents() : void {
    this._changeEvents();
  }

  _removeEvents() : void {
    this._changeEvents(true);
  }

  _changeEvents(deleteEvent: boolean = false) : void {
    const { events } : propType = this._props;
    if (!events) { return; }
    let element = this.getContent();

    if (!element) {
      return;
    }

    // костыль на обработку инпутов вместо лэйблов
    if (element.tagName.toLowerCase() === 'label') {
      element = element.querySelector('input');
    }

    Object.keys(events).forEach((event) => {
      if (deleteEvent) {
        element?.removeEventListener(event, events[event]);
      } else {
        element?.addEventListener(event, events[event]);
      }
    });
  }

  _makePropsProxy(props: propType) : propType {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        self._eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  show() : void {
    this.toggle();
  }

  hide() : void {
    this.toggle(true);
  }

  toggle(hideElement : boolean = false) : void {
    const content = this.getContent();
    if (content !== null) {
      content.style.display = hideElement ? 'none' : this._display;
    }
  }

  _saltCreate(id : string) {
    return `<div data-id="${id}"></div>`;
  }

  _findBlockRecursion(key: string, value: unknown, props: propType) {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i += 1) {
        if (value[i] instanceof Block) {
          const propBlock = value[i] as Block;
          // eslint-disable-next-line no-param-reassign
          props[key][i] = this._saltCreate(propBlock.id);
          this._children[propBlock.id] = propBlock;
        }
        if (Array.isArray(value[i])) {
          const { 0: propKey, 1: propValue } = value[i];
          this._findBlockRecursion(propKey, propValue, props[key][i]);
        }
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  compile(): DocumentFragment {
    const newFragment = document.createElement('template');

    Object.entries(this._props).forEach((prop: propType) => {
      const { 0: propKey, 1: propValue } = prop;

      // поиск блоков
      if (propValue instanceof Block) {
        this._props[propKey] = this._saltCreate(propValue.id);
        this._children[propValue.id] = propValue;
      }

      // рекурсивно фигачим поиск в массивах
      if (Array.isArray(propValue)) {
        this._findBlockRecursion(propKey, propValue, this._props);
      }
    });

    const handleBarser = HandleBars.compile(this.render(), this._props);
    newFragment.innerHTML = handleBarser(this._props);

    Object.entries(this._children).forEach((child) => {
      const { 0: id, 1: block } = child;
      const childElement = newFragment.content.querySelector(`[data-id='${id}']`);
      if (childElement) {
        childElement.replaceWith(block.getContent() as Node);
      }
    });

    return newFragment.content;
  }
}
