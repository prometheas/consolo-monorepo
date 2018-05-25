import { format } from 'util';
import { BaseAdaptor } from 'consolo';

class LogDriverAdaptor extends BaseAdaptor {
  constructor(logger) {
    super();

    this.logDriverInstance = logger;
    this.logMessageRegex = new RegExp(`^\\[(${logger.levels.join('|')})\\] `);
  }

  isLogLevel(level) {
    return this.logDriverInstance.levels.includes(level);
  }

  isLogdriverFormattedMessage(text) {
    return (
      typeof text === 'string'
      && !!text.match(this.logMessageRegex)
    );
  }

  log(level, ...args) {
    // log-driver's logging method implementations themselves directly call
    // console.log(), so we need to be smart about routing the log message
    // directly to stdout
    if (this.isLogdriverFormattedMessage(level)) {
      args.unshift(level);
      process.stdout.write(`${format(...args)}\n`);
    } else {
      this.logDriverInstance[level](...args);
    }
  }
}

export default LogDriverAdaptor;
