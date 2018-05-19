export default class BaseAdaptor {
  enhanceConsole(target) {
    /* eslint-disable no-param-reassign */
    target.log = (...args) => (this.log(...args));
    target.debug = (...args) => (this.log('debug', ...args));
    target.error = (...args) => (this.log('error', ...args));
    target.info = (...args) => (this.log('info', ...args));
    target.warn = (...args) => (this.log('warn', ...args));
    /* eslint-enable no-param-reassign */
  }

  /* eslint-disable class-methods-use-this */
  log() {
    throw Error('Consolo\'s BaseAdaptor must be subclassed and its #log() method overridden');
  }
  /* eslint-enable class-methods-use-this */
}
