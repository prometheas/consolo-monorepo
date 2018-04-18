/* eslint no-console: 0 */
/* eslint no-underscore-dangle: 0 */

export const enhanceConsole = () => {
  console._preEnhancement = {
    debug: console.debug,
    error: console.error,
    info: console.info,
    log: console.log,
    warn: console.warn,
  };

  console.debug = () => (true);
  console.error = () => (true);
  console.info = () => (true);
  console.log = () => (true);
  console.warn = () => (true);
};

export const log = (level, ...logArgs) => {
  throw Error('Not yet implemented.', logArgs);
};

export const restoreConsole = () => {
  console.debug = console._preEnhancement.debug;
  console.error = console._preEnhancement.error;
  console.info = console._preEnhancement.info;
  console.log = console._preEnhancement.log;
  console.warn = console._preEnhancement.warn;

  delete console._preEnhancement;
};
