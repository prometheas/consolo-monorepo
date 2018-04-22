/* eslint no-console: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-use-before-define: 0 */

import { format } from 'util';
import util from './util';

const preservedConsoleMethods = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
};

const logLevels = {
  default: ['debug', 'error', 'info', 'warn'],
};

const defaultConfigs = {
  levels: logLevels.default,
};

const runtimeConfigs = { ...defaultConfigs };

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
 * Sends a message to logger at the log level specified by the first argument.
 *
 * @param {Array} args the arguments provided by the caller
 *
 * @returns {void}
 */
export const log = (...args) => {
  const level = util.extractLogLevelFromArgs(
    args,
    runtimeConfigs.levels,
  );

  if (!level) {
    // this is necessary to keep the project's mocha output clean
    if (!util.isConsoloMochaTestOutput(args)) {
      const err = {
        message: 'Consolo: log level missing from call console.log()',
      };

      if (util.usesUnknownLogLevel(args, runtimeConfigs.levels)) {
        err.message = `Consolo: unknown log level "${args[0]}" used`;
      }

      Error.captureStackTrace(err);
      process.stderr.write(format(
        '%s\n%s',
        err.message,
        err.stack,
      ));
    }

    preservedConsoleMethods.error(...args);
  } else if (level === 'error') {
    preservedConsoleMethods.error(...args);
  } else {
    preservedConsoleMethods.log(...args);
  }
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
