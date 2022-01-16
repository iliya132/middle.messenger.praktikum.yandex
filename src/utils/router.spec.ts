import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Router from './router';
import Route from './route';
import { FakeBlock } from '../components/fakeBlock';

const sinon = require('sinon');

describe.only('Router', () => {
  beforeEach(() => {
    const DOM = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>', { url: 'http://localhost:3000' });
    (global as any).document = DOM.window.document;
    (global as any).window = DOM.window;
  });

  it('should be singleton', () => {
    const router1 = Router.getInstance();
    const router2 = Router.getInstance();
    expect(router1).to.be.equal(router2);
  });

  describe('.use', () => {
    it('should return Router instance', () => {
      const router = Router.getInstance();
      const root = document.getElementById('root') as HTMLElement;
      const block = new FakeBlock({ error: '' }, root);
      const route = new Route('/', () => block);
      const answer = router.use(route);
      expect(answer).to.be.equal(router);
    });
  });

  describe('.go', () => {
    it('should render Block', () => {
      const root = document.getElementById('root') as HTMLElement;
      const block = new FakeBlock({ error: '' }, root);
      sinon.spy(block, 'render');
      const router = Router.getInstance();
      const route = new Route('/', () => block);
      router.use(route);
      router.go('/');
      expect((block.render as any).calledOnce);
    });
  });
});
