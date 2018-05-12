/* eslint-env node, mocha */

/* eslint no-console: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';

import util from './util';
import MockAdaptor from './MockAdaptor';

describe('MockAdaptor', () => {
  describe('#constructor()', () => {
    it('should create an adaptor that satisfies validation', () => {
      const mockAdaptor = new MockAdaptor();
      expect(() => (util.validateAdaptor(mockAdaptor))).not.to.throw();
    });
  });

  describe('#isLogLevel()', () => {
    const mockAdaptor = new MockAdaptor();

    it('should be a function', () => {
      expect(mockAdaptor.isLogLevel).to.be.a('function');
    });

    it('should return true when supplied with default console levels', () => {
      const consoleLevels = ['debug', 'error', 'info', 'warn'];

      consoleLevels.forEach((current) => {
        expect(mockAdaptor.isLogLevel(current)).to.be.true;
      });
    });

    it('should return false when supplied with uknown log levels', () => {
      const uknownLevels = ['foo', 'bar', 137, {}];

      uknownLevels.forEach((current) => {
        expect(mockAdaptor.isLogLevel(current)).to.be.false;
      });
    });
  });

  describe('configuration', () => {
    describe('config.logLevelNames', () => {
      const logLevelNames = ['foo', 'bar', 'baz'];
      const mockAdaptor = new MockAdaptor({
        logLevelNames,
      });

      it('should return true when provided with any custom log level', () => {
        logLevelNames.forEach((currentLevel) => {
          expect(mockAdaptor.isLogLevel(currentLevel)).to.be.true;
        });
      });

      it('should return false when provided with values not amongst custom values', () => {
        const otherValues = ['warn', 'debug', 3, undefined];

        otherValues.forEach((currentLevel) => {
          expect(mockAdaptor.isLogLevel(currentLevel)).to.be.false;
        });
      });
    });
  });
});
