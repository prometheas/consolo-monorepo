export default class BaseAdaptor {
  enhanceConsole(target) {
    const adaptorInstance = this;

    /* eslint-disable no-param-reassign */
    target.log = (...args) => (adaptorInstance.log(...args));
    target.debug = (...args) => (adaptorInstance.log('debug', ...args));
    target.error = (...args) => (adaptorInstance.log('error', ...args));
    target.info = (...args) => (adaptorInstance.log('info', ...args));
    target.warn = (...args) => (adaptorInstance.log('warn', ...args));
    /* eslint-enable no-param-reassign */
  }

  /* eslint-disable class-methods-use-this */
  log() {
    throw Error('Consolo\'s BaseAdaptor must be subclassed and its #log() method overridden');
  }
  /* eslint-enable class-methods-use-this */
}
