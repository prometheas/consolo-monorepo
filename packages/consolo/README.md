# Consolo

A "[progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)" of Node's console into a logger that is not at all [scruffy-looking](https://www.youtube.com/watch?v=gYoDBX1gobM).

⚠️ ***Warning***: prepare yourself for a raft of self-indulgent, often painfully-contrived (and assuredly unlicensed) Star Wars references ahead.  (Don't worry, though—I'll cite nothing from any material released after 1983.  Because I'm a fucking gentleman.)

## Overview

<figure style="float: right; margin: 0; margin-left: 1em; margin-bottom: .25em; width: 25%">
  <img src="https://upload.wikimedia.org/wikipedia/en/b/be/Han_Solo_depicted_in_promotional_image_for_Star_Wars_%281977%29.jpg" />
  <caption>[ <a href="https://en.wikipedia.org/wiki/File:Han_Solo_depicted_in_promotional_image_for_Star_Wars_(1977).jpg">From Wikipedia</a> ]</caption>
</figure>

Consolo, pronounced (and this is blisteringly critical to note) to rhyme with Gen X's favorite carbonite-encased "scoundrel", is a tool that "progressively enhances" Node's global `console` object to relay messages to whatever logger your application uses.

This simply means that it can override the `console` object's logging methods.

The upshot is that calling `console.log('debug', 'some text')` can send the text `some text` to the configured logger (which, one imagines, is configured to output at appropriate level, presumably with a timestamp prefix, and other formatting options), as a `debug` level message.

This can be especially useful to library package authors, as it allows them to avoid forcing any particular logging dependencies upon dependent apps.  In fact, thanks to Consolo's "progressive enhancement"-style implementation, your library's logging statements will even work perfectly in apps that use _no_ logging library, at all!

## Usage

"OK," I hear you muttering, "show me some code, already."  Let's have a look at an example that that routes console messages to the widely-used [`winston` logger](https://www.github.com/winstonjs/winston).

First, install consolo and the winston adaptor:

```sh
$ npm install --save consolo consolo-adaptor-winston
```

Next, create `app.js` as follows:

```js
// app.js
const {
  enhanceConsole,
  restoreConsole,
} = require('consolo');
const WinstonAdaptor = require('consolo-adaptor-winston');
const winston = require('winston');

// configure your logger
winston.configure({
  level: 'warn',
  transports: [
    new winston.transports.File('./my-output.log')
  ]
});

// use an instance of the adaptor to enhance the console object
enhanceConsole(new WinstonAdaptor(winston));

// now use the console object's logging methods as you normally would
console.log('warn', 'a warning message');
console.log('debug', 'some debug message');
console.error('this works, too!');

// you can restore the original console methods, if desired
restoreConsole();

console.info('this will go to stdout');
```

After executing the above script, the contents of `my-output.log` file will be as follows:

```text
warn: a warning message
error: this works, too!
```

Note the absence of the `debug` level message (which was below the `warn` level threshold we'd configured winston to log), as well as the `info` level message (because the console object was restored, hence it was not routed to winston).

And yes, you guessed it: adaptors can be written to support additional logging solutions.  We'll get to that in a bit.

### Library Authors

When you're writing a library, you'll want to keep the following things in mind:

- Always include a `level` string as a first argument when calling `console.log()` directly.
- Do _not_ include a `level` string as a first argument when using `#warn()`, `#info()`, etc., as the level is automatically implied.
- If you're using [ESLint](https://eslint.org), make sure the `no-console` rule is disabled.  (If you're not, you really ought to be.)

### Application Authors

It's at the app level that you'll want to add `consolo` and at least one adaptor as a dependency, as the code at the library level merely uses `console`.

### Adaptor Authors

Creating an adaptor is rather straight-forward!  Honest.  Have a look:

```js
import { BaseAdaptor } from 'consolo';

export default class MyAdaptor extends BaseAdaptor {
  constructor(someLogger) {
    super();
    this.logger = logger;
  }

  isLogLevel(level) {
    // our hypothetical logger conveniently exposes its levels
    return  this.logger
      .getLevelNames()
      .includes(level);
  }

  log(level, ...messages) {
    this.logger.log(level, ...messages);
  }
}
```

### Why the Falcon Would I Want Something Like This?

Alright, alright—don't lose your temper.  This capability is especially useful to library authors, as it allows them to include application logging in their libraries without imposing any specific logger requirements on their consuming applications.
