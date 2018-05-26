# Consolo Winston Adaptor

A [Consolo](https://github.com/prometheas/consolo-monorepo) adaptor that allows Consolo to use [winston](https://github.com/winstonjs/winston).

## Usage

Install and add to your app as follows:

```sh
npm install --save consolo consolo-adaptor-winston
```

Then, in your `app.js` file:

```js
import winston from 'winston';
import { enhanceConsole } from 'consolo';
import WinstonAdaptor from 'consolo-adaptor-winston';

const adaptor = new WinstonAdaptor(new (winston.Logger)({
  transports: [
    // configure your transports…
  ],
}));

enhanceConsole(adaptor);

console.log('error', 'some error message');
```

## License

This package is part of the [Consolo monorepo](https://github.com/prometheas/consolo-monorepo).
