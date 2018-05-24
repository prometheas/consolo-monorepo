/* eslint-env node, mocha */

/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';
import logDriver from 'log-driver';

import {
  enhanceConsole,
  restoreConsole,
} from 'consolo';

import LogDriverAdaptor from './LogDriverAdaptor';

describe('LogDriverAdaptor', () => {
  const logger = logDriver({ level: 'info' });
  let logMethodSpy;

  before(() => {
    logMethodSpy = sinon.spy(logger, 'log');
  });

  after(() => {
    logMethodSpy.restore();
  });

  describe('instance', () => {
    describe('#isLogLevel()', () => {
      it('should return true when provided a known log level', () => {
        const adaptor = new LogDriverAdaptor(logger);
        const validLevel = Object.keys(winston.levels)[1];

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
      it('should delegate to winston.log()', () => {
        const adaptor = new LogDriverAdaptor(logger);
        const callArgs = ['error', 'first arg', 'second arg'];

        adaptor.log(...callArgs);
        expect(logMethodSpy.calledOnce).to.be.true;
        expect(logMethodSpy.calledWithExactly(...callArgs));
      });
    });
  });

  describe('using global singleton', () => {
    const adaptor = new LogDriverAdaptor(logger);

    it('should pass console.log() calls to winston.log()', () => {
      const callArgs = ['info', 'test message'];

      expect(
        logMethodSpy.calledWithExactly(...callArgs),
        'preventing a false positive on next expect()',
      ).to.be.false;

      enhanceConsole(adaptor);
      console.log(...callArgs);
      restoreConsole();

      expect(
        logMethodSpy.calledWithExactly(...callArgs),
        'confirm delegation to winston',
      ).to.be.true;
    });
  });

  describe('using logger instance', () => {
    const loggerSpy = sinon.spy(logger, 'log');
    const adaptor = new LogDriverAdaptor(logger);

    it('should pass console.log() calls to logger instance', () => {
      const callArgs = ['info', 'winston logger instance test message'];

      expect(
        loggerSpy.calledWithExactly(...callArgs),
        'preventing a false positive on next expect()',
      ).to.be.false;

      enhanceConsole(adaptor);
      console.log(...callArgs);
      restoreConsole();

      expect(
        loggerSpy.calledWithExactly(...callArgs),
        'confirm delegation to winston',
      ).to.be.true;
    });
  });
});
