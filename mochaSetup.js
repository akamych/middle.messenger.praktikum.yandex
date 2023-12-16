import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<body><main id="main"></main></body>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
