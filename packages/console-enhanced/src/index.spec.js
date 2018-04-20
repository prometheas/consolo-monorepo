/* eslint-env node, mocha */

/* eslint no-console: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import stdMocks from 'std-mocks';

import {
  enhanceConsole,
  log,
  restoreConsole,
} from './index';

/**
 * @var keep references to original methods for later comparison
 */
const originalConsoleMethods = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
};

describe('Library', () => {
  describe('#enhanceConsole()', () => {
    it('should create a `consoloEnhanced` property on console', () => {
      expect(console.consoloEnhanced).to.be.undefined;
      enhanceConsole();
      expect(console.consoloEnhanced).to.be.true;
    });

    it('should override the logging methods', () => {
      expect(console.debug).not.to.equal(originalConsoleMethods.debug);
      expect(console.error).not.to.equal(originalConsoleMethods.error);
      expect(console.info).not.to.equal(originalConsoleMethods.info);
      expect(console.log).not.to.equal(originalConsoleMethods.log);
      expect(console.warn).not.to.equal(originalConsoleMethods.warn);
    });
  });

  describe('#log()', () => {
    describe('missing log level', () => {
      let output;

      before(() => {
      stdMocks.use({ print: false });
      log('hello');
      stdMocks.restore();

        output = stdMocks.flush();
      });

      it('should write the message to stdout', () => {
      expect(
          output.stdout.includes('hello\n'),
        'should see "hello" in stdout',
      ).to.be.true;
      });

      it('should warn about missing log level to stderr', () => {
        const foundWarning = output.stderr.reduce((hasAlreadyBeenFound, currentItem) => (
          hasAlreadyBeenFound
          || !!String(currentItem).match(/Consolo: log level missing/)
        ), false);

        expect(foundWarning).to.be.true;
      });
    });
  });

  describe('#restoreConsole()', () => {
    it('should restore the console methods', () => {
      restoreConsole();

      expect(console.debug).to.equal(originalConsoleMethods.debug);
      expect(console.error).to.equal(originalConsoleMethods.error);
      expect(console.info).to.equal(originalConsoleMethods.info);
      expect(console.log).to.equal(originalConsoleMethods.log);
      expect(console.warn).to.equal(originalConsoleMethods.warn);
    });

    it('should remove the console._preEnhancement property', () => {
      expect(console._preEnhancement).to.equal(undefined);
    });
  });
});
