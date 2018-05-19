/* eslint-env node, mocha */

/* eslint no-console: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';

import util from './util';
import MockAdaptor from './MockAdaptor';

describe('util', () => {
  const levels = ['debug', 'info', 'warn', 'error'];

  describe('#extractLogLevelFromArgs()', () => {
    const mockAdaptor = new MockAdaptor({
      logLevelNames: levels,
    });

    describe('when valid log level is found', () => {
      it('should return the log level', () => {
        const args = [
          ['info', 'Some %s is good', 'message'],
          ['error', 'Super', 'error message'],
        ];

        expect(util.extractLogLevelFromArgs(args[0], mockAdaptor)).to.equal('info');
        expect(util.extractLogLevelFromArgs(args[1], mockAdaptor)).to.equal('error');
      });

      it('should remove the log level from the args array', () => {
        const args = ['info', 'Some %s is good', 'message'];
        const originalFirstArg = args[0];
        const originalNumArgs = args.length;

        util.extractLogLevelFromArgs(args, mockAdaptor);

        expect(args.length).equals(originalNumArgs - 1);
        expect(args[0]).not.to.equal(originalFirstArg);
      });
    });

    describe('when unrecognized log level is found', () => {
      it('should return undefined', () => {
        const args = ['unknown', 'This happened %d days ago', 8];

        expect(util.extractLogLevelFromArgs(args, mockAdaptor)).to.be.undefined;
      });

      it('should not modify the the args array', () => {
        const args = ['unknown', 'This happened %d days ago', 8];
        const originalArgs = [...args];

        util.extractLogLevelFromArgs(args, mockAdaptor);

        expect(args).to.deep.equal(originalArgs);
      });
    });
  });

  describe('#isConsoloMochaTestOutput()', () => {
    it.skip('this is lazy of me, but...', () => { });
  });

  describe('#validateAdaptor()', () => {
    let dummyAdaptor;

    beforeEach(() => {
      dummyAdaptor = new MockAdaptor();
    });

    it('should not throw an error when supplied with a valid adaptor', () => {
      expect(
        () => (util.validateAdaptor(dummyAdaptor)),
        'has required methods and props',
      ).not.to.throw();
    });

    it('should throw an error if any required props are missing', () => {
      const missingEnhanceMethod = { ...dummyAdaptor };
      expect(
        () => {
          missingEnhanceMethod.enhanceConsole = true;
          util.validateAdaptor(missingEnhanceMethod);
        },
        'throw when #enhanceConsole is not a function',
      ).to.throw();
      expect(
        () => {
          delete missingEnhanceMethod.enhanceConsole;
          util.validateAdaptor(missingEnhanceMethod);
        },
        'throw for missing #enhanceConsole()',
      ).to.throw();

      const missingLogMethod = { ...dummyAdaptor };
      expect(
        () => {
          missingLogMethod.log = 'not a function';
          util.validateAdaptor(missingLogMethod);
        },
        'throw when #log is not a function',
      ).to.throw();
      expect(
        () => {
          delete missingLogMethod.log;
          util.validateAdaptor(missingLogMethod);
        },
        'throw for missing #log()',
      ).to.throw();
    });

    it('should add #hasBeenValidatedByConsolo flag to adaptor for faster validation', () => {
      if (dummyAdaptor.hasBeenValidatedByConsolo) {
        delete dummyAdaptor.hasBeenValidatedByConsolo;
      }

      util.validateAdaptor(dummyAdaptor);
      expect(
        dummyAdaptor.hasBeenValidatedByConsolo,
        'confirm addition of flag prop',
      ).to.be.true;
    });
  });
});
