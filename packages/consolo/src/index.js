/* eslint no-console: 0 */

import { format } from 'util';
import util from './util';

const preservedConsoleMethods = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
};

let consoloAdaptor;

/**
 * Applies enhancements to the global console object.
 */
export const enhanceConsole = (adaptor) => {
  util.validateAdaptor(adaptor);

  consoloAdaptor = adaptor;
  consoloAdaptor.enhanceConsole();

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
    consoloAdaptor.logLevels,
  );

  if (!level) {
    // this is necessary to keep the project's mocha output clean
    if (!util.isConsoloMochaTestOutput(args)) {
      const err = {
        message: 'Consolo: log level missing from call console.log()',
      };

      if (util.usesUnknownLogLevel(args, consoloAdaptor.logLevels)) {
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
  } else {
    consoloAdaptor.log(...args);
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
