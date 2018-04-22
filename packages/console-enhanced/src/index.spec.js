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
 * @var {object} originalConsoleMethods references to original methods for later comparison
 */
const originalConsoleMethods = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
};

/**
 * Answers whether the array contains any elements that match the provided
 * pattern.
 *
 * @param {RegExp} pattern pattern for which to search the list
 * @param {Array} list list of strings (or data with #toString() method)
 *
 * @returns {boolean} true if pattern is found in the list
 */
function containsMatchingItem(pattern, list) {
  return list.reduce((hasAlreadyBeenFound, currentItem) => (
    hasAlreadyBeenFound
    || !!String(currentItem).match(pattern)
  ), false);
}

/**
 * Searching through an array of strings to determine whether any seem to be
 * a message from the Consolo package.
 *
 * @param {Array<string>} messages list of message strings
 *
 * @returns bool true when a string is found to start with `Consolo:`
 */
function containsConsoloMessage(messages) {
  return containsMatchingItem(/^Consolo: /, messages);
}

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
    describe('with valid log level', () => {
      let output;

      before(() => {
        stdMocks.use({ print: false });
        log('info', 'some information to report');
        log('error', 'an error message');
        stdMocks.restore();

        output = stdMocks.flush();
        output.combined = [...output.stdout, ...output.stderr];
      });

      it('should write the message to either stdout or stderr', () => {
        expect(
          containsMatchingItem(/^some information to report/, output.combined),
          'confirm "info" log level',
        ).to.be.true;

        expect(
          containsMatchingItem(/^an error message/, output.combined),
          'confirm "error" log level',
        ).to.be.true;
      });

      it('should not result in Consolo warnings in stderr', () => {
        expect(
          containsConsoloMessage(output.stderr),
          'confirm messages with level do not warn on stderr',
        ).to.be.false;
      });
    });

    describe('missing log level', () => {
      let output;

      before(() => {
        stdMocks.use({ print: false });
        log('hello');
        stdMocks.restore();

        output = stdMocks.flush();
      });

      it('should write the message to stderr', () => {
        expect(
          output.stderr.includes('hello\n'),
          'should see "hello" in stderr',
        ).to.be.true;
      });

      it('should warn about missing log level to stderr', () => {
        expect(
          containsConsoloMessage(output.stderr),
          'confirm attempt to log without level warns to stderr',
        ).to.be.true;
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
