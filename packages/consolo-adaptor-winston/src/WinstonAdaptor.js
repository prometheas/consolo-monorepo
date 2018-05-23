import { BaseAdaptor } from 'consolo';

class WinstonAdaptor extends BaseAdaptor {
  constructor(logger) {
    super();

    if (!logger || !logger.log) {
      throw Error('No winston logger provided for adaptor');
    }

    this.logger = logger;
  }

  isLogLevel(level) {
    const levelNames = Object.keys(this.logger.levels);
    return levelNames.includes(level);
  }

  log(level, ...messages) {
    this.logger.log(level, ...messages);
  }
}

export default WinstonAdaptor;
