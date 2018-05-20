/* eslint-env node, mocha */

/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';
import winston from 'winston';

import {
  enhanceConsole,
  restoreConsole,
} from '../../consolo';

import WinstonAdaptor from './WinstonAdaptor';

describe('WinstonAdaptor', () => {
  let winstonLogSpy;

  winston.configure({
    transports: [], // suppress winston's console output for these tests
  });

  before(() => {
    winstonLogSpy = sinon.spy(winston, 'log');
  });

  after(() => {
    winstonLogSpy.restore();
  });

  describe('instance', () => {
    describe('#isLogLevel()', () => {
      it('should return true when provided a known log level', () => {
        const adaptor = new WinstonAdaptor(winston);
        const validLevel = Object.keys(winston.levels)[1];

        expect(
          adaptor.isLogLevel(validLevel),
          'confirm happy path',
        ).to.be.true;
      });

      it('should return false when provided an unknown log level', () => {
        const adaptor = new WinstonAdaptor(winston);
        const invalidLevel = 'invalidlevel';

        expect(
          adaptor.isLogLevel(invalidLevel),
          'confirm detection of bad value',
        ).to.be.false;
      });
    });

    describe('#log()', () => {
      it('should delegate to winston.log()', () => {
        const adaptor = new WinstonAdaptor(winston);
        const callArgs = ['error', 'first arg', 'second arg'];

        adaptor.log(...callArgs);
        expect(winstonLogSpy.calledOnce).to.be.true;
        expect(winstonLogSpy.calledWithExactly(...callArgs));
      });
    });
  });

  describe('using global singleton', () => {
    const adaptor = new WinstonAdaptor(winston);

    it('should pass console.log() calls to winston.log()', () => {
      const callArgs = ['info', 'test message'];

      expect(
        winstonLogSpy.calledWithExactly(...callArgs),
        'preventing a false positive on next expect()',
      ).to.be.false;

      enhanceConsole(adaptor);
      console.log(...callArgs);
      restoreConsole();

      expect(
        winstonLogSpy.calledWithExactly(...callArgs),
        'confirm delegation to winston',
      ).to.be.true;
    });
  });

  describe('using logger instance', () => {
    const logger = new (winston.Logger)({
      transports: [],
    });
    const loggerSpy = sinon.spy(logger, 'log');
    const adaptor = new WinstonAdaptor(logger);

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
