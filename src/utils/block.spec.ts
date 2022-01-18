import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { FakeBlock } from '../components/fakeBlock';
import { IProps } from '../types/Types';
import Block from './block';

// const sinon = require('sinon');

describe.only('Block', () => {
  let block: Block<IProps>;
  let root: HTMLElement;
  beforeEach(() => {
    const DOM = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="root">test</div></body></html>', { url: 'http://localhost:3000' });
    (global as any).document = DOM.window.document;
    (global as any).window = DOM.window;
    root = document.getElementById('root') as HTMLElement;
    block = new FakeBlock({ error: '' }, root);
  });

  describe('constructor', () => {
    it('can create new block', () => {
      expect(block).to.exist;
    });
  });

  describe('.getContent', () => {
    it('should return root content', () => {
      expect(block.getContent()).to.be.equal('test');
    });
  });

  describe('.setProps', () => {
    it('should assign new props', () => {
      const newProps: IProps = { error: '123' };
      block.setProps({ ...block.props, ...newProps });
      expect(block.props).to.deep.equal(newProps);
    });
  });

  describe('.show', () => {
    it('should set display style to block', () => {
      block.show();
      expect(root.style.display).to.equal('block');
    });
  });

  describe('.hide', () => {
    it('should set display style to none', () => {
      block.hide();
      expect(root.style.display).to.equal('none');
    });
  });
});
