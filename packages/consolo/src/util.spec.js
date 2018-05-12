/* eslint-env node, mocha */

/* eslint no-console: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';

import util from './util';

describe('util', () => {
  const levels = ['debug', 'info', 'warn', 'error'];

  describe('#extractLogLevelFromArgs()', () => {
    describe('when valid log level is found', () => {
      it('should return the log level', () => {
        const args = [
          ['info', 'Some %s is good', 'message'],
          ['error', 'Super', 'error message'],
        ];

        expect(util.extractLogLevelFromArgs(args[0], levels)).to.equal('info');
        expect(util.extractLogLevelFromArgs(args[1], levels)).to.equal('error');
      });

      it('should remove the log level from the args array', () => {
        const args = ['info', 'Some %s is good', 'message'];
        const originalFirstArg = args[0];
        const originalNumArgs = args.length;

        util.extractLogLevelFromArgs(args, levels);

        expect(args.length).equals(originalNumArgs - 1);
        expect(args[0]).not.to.equal(originalFirstArg);
      });
    });

    describe('when unrecognized log level is found', () => {
      it('should return undefined', () => {
        const args = ['unknown', 'This happened %d days ago', 8];

        expect(util.extractLogLevelFromArgs(args, levels)).to.be.undefined;
      });

      it('should not modify the the args array', () => {
        const args = ['unknown', 'This happened %d days ago', 8];
        const originalArgs = [...args];

        util.extractLogLevelFromArgs(args, levels);

        expect(args).to.deep.equal(originalArgs);
      });
    });
  });

  describe('#isConsoloMochaTestOutput()', () => {
    it.skip('this is lazy of me, but...', () => { });
  });

  describe('#usesUnknownLogLevel()', () => {
    it('should throw when called without levels array', () => {
      expect(() => {
        util.usesUnknownLogLevel(['err']);
      }).to.throw();
    });

    it('should return false when fewer than two arguments are supplied', () => {
      expect(util.usesUnknownLogLevel([], levels)).to.be.false;
      expect(util.usesUnknownLogLevel(['debug'], levels)).to.be.false;
    });

    it('should return false when first argument is not a string', () => {
      const nonStringArgs = [0, [], {}, undefined];

      nonStringArgs.forEach((current) => {
        expect(util.usesUnknownLogLevel([current, 'some message'], levels)).to.be.false;
      });
    });

    it('should return true when the first argument passes for an attempted log level', () => {
      expect(util.usesUnknownLogLevel(['foo', 'some message'], levels)).to.be.true;
    });
  });

  describe('#validateAdaptor()', () => {
    const dummyAdaptor = {
      enhanceConsole: () => (true),
      log: () => (true),
      logLevels: [],
    };

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
  });
});
