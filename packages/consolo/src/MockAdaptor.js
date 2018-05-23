import BaseAdaptor from './BaseAdaptor';

/**
 * references to original methods for later comparison
 */
const originalConsoleMethods = {
  /* eslint-disable no-console */
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  warn: console.warn,
  /* eslint-enable no-console */
};

export default class MockAdaptor extends BaseAdaptor {
  constructor(opts = {}) {
    super();
    this.logLevelNames = opts.logLevelNames || ['debug', 'error', 'info', 'warn'];
  }

  /* eslint-disable class-methods-use-this */
  log(level, ...args) {
    originalConsoleMethods.log(level, ...args);
  }
  /* eslint-enable class-methods-use-this */

  isLogLevel(level) {
    return this.logLevelNames.includes(level);
  }
}
