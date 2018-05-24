const path = (process.env.CONSOLO_TESTING) ? './src' : './dist';

/* eslint-disable import/no-dynamic-require */
module.exports = require(path);
/* eslint-enable import/no-dynamic-require */
