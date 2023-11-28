/* eslint-disable no-unused-vars */
import Block from './Block.ts';
import Route from './Route.ts';
import store from './Store.js';

export enum ACCESS_LEVELS {
  GUESTS = 'GUESTS',
  USERS = 'USERS',
  ALL = 'ALL',
}

export enum CHAT_PAGES {
  INDEX = '/',
  MESSENGER = '/messenger',
  LOGIN = '/login',
  SIGNUP = '/sign-up',
  SETTINGS = '/settings',
}

class Router {
  // eslint-disable-next-line no-use-before-define
  private static __instance: Router | null = null;

  private routes: Route[];

  private history: History;

  private _currentRoute: Route | null;

  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block, accessLevel: string = ACCESS_LEVELS.ALL): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, accessLevel });
    this.routes.push(route);
    return this;
  }

  start() : void {
    window.onpopstate = (event: Event) => {
      if (event === null || event.currentTarget === null) { return; }
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) : void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  checkAccess(pathname: string) : boolean {
    const nextRoute = this.routes.find((route) => route.match(pathname));
    if (!nextRoute) { return false; }

    if (nextRoute.getAccessLevel() === ACCESS_LEVELS.USERS
      && store.getState().user.authorized === false) {
      return false;
    }

    return true;
  }

  go(pathname: string) : void {
    if (!store.getState().user.authorized && pathname === CHAT_PAGES.INDEX) {
      this.go(CHAT_PAGES.LOGIN);
      return;
    }
    if (!this.checkAccess(pathname)) { return; }
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  guestRedirect() : void {
    if (this._currentRoute === null
        || this._currentRoute.getAccessLevel() === ACCESS_LEVELS.USERS) {
      this.go(CHAT_PAGES.LOGIN);
    }
  }

  usersRedirect() : void {
    if (this._currentRoute === null
        || this._currentRoute.getAccessLevel() === ACCESS_LEVELS.GUESTS) {
      this.go(CHAT_PAGES.INDEX);
    }
  }

  back() : void {
    this.history.back();
  }

  forward() : void {
    this.history.forward();
  }

  getRoute(pathname: string) : Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

const router = new Router('body > main');

export default router;
