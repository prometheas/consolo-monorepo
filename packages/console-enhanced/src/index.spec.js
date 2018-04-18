/* eslint-env node, mocha */

import { expect } from 'chai';

import {
  enhanceConsole,
  log,
  restoreConsole,
} from './index';

describe('Library', () => {
  describe('#enhanceConsole()', () => {
    it('should be a function', () => {
      expect(enhanceConsole).to.be.a('function');
    });
  });

  describe('#log()', () => {
    it('should be a function', () => {
      expect(log).to.be.a('function');
    });
  });

  describe('#restoreConsole()', () => {
    it('should restore the console methods', () => {
      expect(restoreConsole).to.be.a('function');
    });
  });
});
