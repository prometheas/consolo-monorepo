/* eslint no-console: 0 */
/* eslint no-underscore-dangle: 0 */

const preservedConsoleMethods = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
};

export const enhanceConsole = () => {
  console.debug = () => (true);
  console.error = () => (true);
  console.info = () => (true);
  console.log = () => log;
  console.warn = () => (true);

  console.consoloEnhanced = true;
};

export const log = (...args) => {
  let level = (args.length > 1) ? args.shift() : undefined;

  if (!level) {
    level = 'info';
  }

  preservedConsoleMethods.log(...args);
};

export const restoreConsole = () => {
  delete console.consoloEnhanced;

  console.debug = preservedConsoleMethods.debug;
  console.error = preservedConsoleMethods.error;
  console.info = preservedConsoleMethods.info;
  console.log = preservedConsoleMethods.log;
  console.warn = preservedConsoleMethods.warn;
};
