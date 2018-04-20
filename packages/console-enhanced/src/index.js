/* eslint no-console: 0 */
/* eslint no-underscore-dangle: 0 */

const preservedConsoleMethods = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
};


/**
 * Applies enhancements to the global console object.
 */
export const enhanceConsole = () => {
  Object.keys(consoleMethodOverrides).forEach((methodName) => {
    console[methodName] = consoleMethodOverrides[methodName];
  });

  console.consoloEnhanced = true;
};

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
 * @param {Array<string>} levels array of recognized log level names
 *
 * @returns {string|undefined} the log level, if found, otherwise `undefined`
 */
export const extractLogLevelFromArgs = (args, levels) => (
  (
    args.length > 1
    && levels.includes(args[0])
  ) ? args.shift() : undefined
);

/**
 * Sends a message to logger at the log level specified by the first argument.
 *
 * @param {Array} args the arguments provided by the caller
 *
 * @returns {void}
 */
export const log = (...args) => {
  let level = extractLogLevelFromArgs(
    args,
    ['debug', 'error', 'info', 'warn'],
  );

  if (!level) {
    level = 'info';
  }

  preservedConsoleMethods.log(...args);
};

/**
 * Restores the global console object.
 */
export const restoreConsole = () => {
  delete console.consoloEnhanced;

  console.debug = preservedConsoleMethods.debug;
  console.error = preservedConsoleMethods.error;
  console.info = preservedConsoleMethods.info;
  console.log = preservedConsoleMethods.log;
  console.warn = preservedConsoleMethods.warn;
};

const consoleMethodOverrides = {
  debug: (...args) => (preservedConsoleMethods.debug(...args)),
  error: (...args) => (preservedConsoleMethods.error(...args)),
  info: (...args) => (preservedConsoleMethods.info(...args)),
  log,
  warn: (...args) => (preservedConsoleMethods.warn(...args)),
};
