/* eslint-env node, mocha */

/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';
import logDriver from 'log-driver';
import stdMocks from 'std-mocks';

import {
  enhanceConsole,
  restoreConsole,
} from 'consolo';

import LogDriverAdaptor from './LogDriverAdaptor';

describe('LogDriverAdaptor', () => {
  describe('instance', () => {
    describe('#isLogLevel()', () => {
      const logger = logDriver({ level: 'info' });

      it('should return true when provided a known log level', () => {
        const adaptor = new LogDriverAdaptor(logger);
        const validLevel = logger.levels[1];

        expect(
          adaptor.isLogLevel(validLevel),
          'confirm happy path',
        ).to.be.true;
      });

      it('should return false when provided an unknown log level', () => {
        const adaptor = new LogDriverAdaptor(logger);
        const invalidLevel = 'invalidlevel';

        expect(
          adaptor.isLogLevel(invalidLevel),
          'confirm detection of bad value',
        ).to.be.false;
      });
    });

    describe('#log()', () => {
      it('should delegate to the appropriate logging method', () => {
        const level = 'error';
        const logger = logDriver({ level });
        const adaptor = new LogDriverAdaptor(logger);
        const loggingMethodSpy = sinon.spy(logger, level);
        const logDriverMethodCallArgs = ['first arg', 'second arg'];

        adaptor.log(level, ...logDriverMethodCallArgs);

        expect(
          loggingMethodSpy.called,
          'confirm logging method was called at all',
        ).to.be.true;

        expect(
          loggingMethodSpy.calledWith(...logDriverMethodCallArgs),
          'confirm logging method was called with specified args',
        ).to.be.true;
      });
    });
  });

  describe('using logger instance', () => {
    it('should pass console.log("info") calls to logDriver#info()', () => {
      const level = 'info';
      const logger = logDriver({ level });
      const adaptor = new LogDriverAdaptor(logger);
      const loggingMethodSpy = sinon.spy(logger, level);
      const logDriverMethodCallArgs = ['log-driver logger instance test message'];
      let output;

      expect(
        loggingMethodSpy.calledWith(...logDriverMethodCallArgs),
        'preventing a false positive on next expect()',
      ).to.be.false;

      try {
        stdMocks.use({ print: false });
        enhanceConsole(adaptor);
        console.log(level, ...logDriverMethodCallArgs);
        restoreConsole();
        stdMocks.restore();

        expect(
          loggingMethodSpy.calledWith(...logDriverMethodCallArgs),
          `confirm delegation to log-driver of ${level} message`,
        ).to.be.true;

        output = stdMocks.flush();
        expect(output.stdout).matches(/\[info\]/);
      } catch (error) {
        restoreConsole();
        throw error;
      }
    });
  });
});
