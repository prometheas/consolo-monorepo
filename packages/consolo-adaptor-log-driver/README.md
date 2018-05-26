# Consolo Log-Driver Adaptor

A [Consolo](https://github.com/prometheas/consolo-monorepo) adaptor that allows Consolo to use [log-driver](https://github.com/cainus/logdriver).

## Usage

Install and add to your app as follows:

```sh
npm install --save consolo consolo-adaptor-log-driver
```

Then, in your `app.js` file:

```js
import logDriver from 'log-driver';
import { enhanceConsole } from 'consolo';
import LogDriverAdaptor from 'consolo-adaptor-log-driver';

const adaptor = new LogDriverAdaptor(logDriver({
  level: 'info',
}));

enhanceConsole(adaptor);

console.log('error', 'some error message');
```

## License

This package is part of the [Consolo monorepo](https://github.com/prometheas/consolo-monorepo).
