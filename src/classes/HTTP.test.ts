import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import {
  createSandbox, SinonFakeXMLHttpRequestStatic, SinonSandbox, SinonStub, useFakeXMLHttpRequest,
} from 'sinon';
import {
  afterEach, beforeEach, describe, it,
} from 'mocha';
import HTTP, { ApiOptionsType } from './HTTP.ts';

use(sinonChai);

describe('HTTP', () => {
  const sandbox: SinonSandbox = createSandbox();
  const demoUrl = 'https://www.akamych.com';

  let xhr: SinonFakeXMLHttpRequestStatic;
  let http: HTTP;
  let request: SinonStub<any>;

  beforeEach(() => {
    xhr = useFakeXMLHttpRequest();
    http = new HTTP();
    request = sandbox
      .stub(http, '_request' as keyof typeof http)
      .callsFake(() => Promise.resolve(xhr));
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('get', () => {
    it('makes simple request', () => {
      http.get(demoUrl);

      // eslint-disable-next-line no-unused-expressions
      expect(request.calledOnce).to.be.true;
    });

    it('stringifies data', () => {
      const demoData: ApiOptionsType = {
        data: {
          a: 'a',
          b: 2,
          c: null,
        },
      };

      http.get(demoUrl, demoData);

      // eslint-disable-next-line no-unused-expressions
      expect(request.calledWithMatch('?a=a&b=2&c=null')).to.be.true;
    });
  });

  describe('post', () => {
    it('makes simple request', () => {
      http.post(demoUrl, {});

      // eslint-disable-next-line no-unused-expressions
      expect(request.calledOnce).to.be.true;
    });
  });

  describe('put', () => {
    it('makes simple request', () => {
      http.post(demoUrl, {});

      // eslint-disable-next-line no-unused-expressions
      expect(request.calledOnce).to.be.true;
    });
  });

  describe('delete', () => {
    it('makes simple request', () => {
      http.post(demoUrl, {});

      // eslint-disable-next-line no-unused-expressions
      expect(request.calledOnce).to.be.true;
    });
  });
});
