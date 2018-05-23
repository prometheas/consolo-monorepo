/* eslint-env node, mocha */

/* eslint no-console: 0 */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';

import BaseAdaptor from './BaseAdaptor';

describe('BaseAdaptor', () => {
  describe('#enhanceConsole()', () => {
    it('should override the standard console output methods', () => {
      const originalMethods = {
        log: () => (true),
        debug: () => (true),
        error: () => (true),
        info: () => (true),
        warn: () => (true),
      };
      const mockConsole = { ...originalMethods };

      const testInstance = new BaseAdaptor();
      testInstance.enhanceConsole(mockConsole);

      Object.keys(originalMethods).forEach((currentMethod) => {
        expect(
          mockConsole[currentMethod],
          `confirm ${currentMethod} is a function`,
        ).to.be.a('function');
        expect(mockConsole[currentMethod]).not.to.equal(originalMethods[currentMethod]);
      });
    });
  });

  describe('#log()', () => {
    it('should throw an error when called', () => {
      expect(() => {
        const testInstance = new BaseAdaptor();
        testInstance.log('foo');
      }).to.throw();
    });
  });
});
