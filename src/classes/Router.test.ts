import {
  afterEach, beforeEach, describe, it,
} from 'mocha';
import { expect, use } from 'chai';
import { createSandbox } from 'sinon';
import sinonChai from 'sinon-chai';
import { ACCESS_LEVELS, Router } from './Router.ts';
import Block from './Block.ts';

describe('Router', () => {
  use(sinonChai);

  class TestRouterPage extends Block {
    protected _fakeDivId: string = 'TestRouterPage';

    _createFakeDiv() {
      const div = document.createElement('main');
      div.id = this._fakeDivId;
      return div;
    }

    getContent() : HTMLElement {
      return this._createFakeDiv();
    }

    _render() : void {
      this._element = this._createFakeDiv();
    }
  }

  class TestRouterPage2 extends TestRouterPage {
    protected _fakeDivId: string = 'TestRouterPage2';
  }

  let router: Router;
  const sandbox = createSandbox();

  beforeEach(() => {
    router = new Router('body > main');

    router
      .use('/', TestRouterPage, ACCESS_LEVELS.ALL)
      .use('/second', TestRouterPage2, ACCESS_LEVELS.ALL)
      .use('/onlyUsers', TestRouterPage2, ACCESS_LEVELS.USERS)
      .use('/onlyGuest', TestRouterPage2, ACCESS_LEVELS.GUESTS)
      .start();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('uses everything correctly', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(router.routes.length).to.eq(4);
  });

  it('loads index page', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(document.getElementById('TestRouterPage')).not.to.be.null;
  });

  describe('go', () => {
    it('goes to right location with go method', () => {
      router.go('/second');

      // eslint-disable-next-line no-unused-expressions
      expect(window.location.pathname).to.eq('/second');
    });

    it('renders right page after go method', () => {
      router.go('/second');
      // eslint-disable-next-line no-unused-expressions
      expect(document.getElementById('TestRouterPage2')).not.to.be.null;
    });
  });

  describe('redirects', () => {
    it('redirects guests from users pages', () => {
      const routerGoSpy = sandbox.spy(router, 'go');
      router.go('/onlyUsers');
      router.guestRedirect();

      // eslint-disable-next-line no-unused-expressions
      expect(routerGoSpy.callCount).to.eq(2);
    });

    // store is not connected, so there must be two redirects: to messanger page & to login page
    it('redirects users from guest pages', () => {
      const routerGoSpy = sandbox.spy(router, 'go');
      router.go('/onlyGuest');
      router.usersRedirect();

      // eslint-disable-next-line no-unused-expressions
      expect(routerGoSpy.callCount).to.eq(3);
    });
  });
});
