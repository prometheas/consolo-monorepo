const api = {
  /**
   * Given a list of two or more values in the `args` argument and a set of
   * "recognized" log level names in the `levels` argument, this function will
   * shift the first item in the `args` array off the list and return that string
   * as the logging level.  (Note that this mutates the `args` array.)
   *
   * If there are fewer than two items in the `args` array, or the first item in
   * that array is not found in the `levels` array, the `args` array is not
   * mutated, and `undefined` is returned.
   *
   * @param {Array} args array of args
   * @param {ConsoloAdaptor} levels array of recognized log level names
   *
   * @returns {string|undefined} the log level, if found, otherwise `undefined`
   */
  extractLogLevelFromArgs: (args, adaptor) => {
    let level;

    if (args.length > 1 && adaptor.isLogLevel(args[0])) {
      level = args.shift();
    }

    return level;
  },

  /**
   * Answers whether the args array appears to be output form mocha tests.
   *
   * @param {Array} args a list of arguments to evaluate
   *
   * @returns {bool}
   */
  isConsoloMochaTestOutput: (args) => {
    if (!process.env.CONSOLO_TESTING) {
      return false;
    }

    const isDescribeOutput = (
      args.length === 3
      && String(args[0]).includes('\u001b')
      && String(args[1]).match(/^\s+$/)
      && args.reduce((prev, currArg) => (prev && typeof currArg === 'string'), true)
    );

    /* eslint-disable no-control-regex */
    const isItOutput = String(args[0]).match(/^\s+\u001b.+(✓|-|%d+\))/);
    /* eslint-enable no-control-regex */

    return isDescribeOutput || isItOutput;
  },

  /**
   * Throws an error if the supplied value does not seem to be a valid Consolo
   * adaptor.
   *
   * @param {any} adaptor the value to evaluate
   *
   * @throws {Error}
   */
  validateAdaptor: (adaptor) => {
    if (!adaptor.hasBeenValidatedByConsolo) {
      if (typeof adaptor.enhanceConsole !== 'function') {
        throw Error('Consolo adaptor missing #enhanceConsole()');
      }

      if (typeof adaptor.log !== 'function') {
        throw Error('Consolo adaptor missing #log()');
      }

      /* eslint-disable no-param-reassign */
      adaptor.hasBeenValidatedByConsolo = true;
      /* eslint-enable no-param-reassign */
    }
  },
};

export default api;
