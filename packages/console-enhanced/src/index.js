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
  Object.keys(consoleMethodOverrides).forEach((methodName) => {
    console[methodName] = consoleMethodOverrides[methodName];
  });

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
