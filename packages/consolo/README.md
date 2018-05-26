# Consolo

A "[progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)" of Node's console into a logger that is not at all [scruffy-looking](https://www.youtube.com/watch?v=gYoDBX1gobM).

## Overview

Consolo (pronounced—and this is absolutely critical to note—to rhyme with everyone's favorite carbonite-encased "scoundrel") is a light-weight library that offers "[progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)" atop Node's `console` object, allowing you to connect it to a more featureful logger solution.  Consolo is also, very notably, not at all [scruffy-looking](https://www.youtube.com/watch?v=gYoDBX1gobM).

<pre style="line-height:90%;">
~~~~~~~~~~~~~~~~~~~~~~~~~~::::+DN8$Z8NDMMN8Z87::::::::::::::::::::::::::::::::::
~~~~~~~~~~~~~~~~~~~~~~::~::::=NDNO8DMDMMMNNZZ$8:~:::::::::::::::::::::::::::::::
~~~~~~~~~~~~~~~~~~~~~:~::::::8NN8NN8N8NO7$OO$DD8::::::::::::::::::::::::::::::::
~~~~~~~~~~~~~~~~~~~~~::~:::::DNM8NODDD888DD8ZNDDO:::::::::::::::::::::::::::::::
~~~~~~~~~~~~~~~~~~~:::~::::::NNMMNDO$$OZODND8NDND~::::::::::::::::::::::::::::::
~~~~~O87~~~~~~~~:~~:~:::::::7NMMMNZZ7I+~=?7DNNN887::::::::::::::::::::::::::::::
~~~~:DDDZZ+~~~~~~~::::~:::::?8MNMNOZ$Z8D8O$7NNNO8$::::::::::::::::::::::::::::::
~~~~~:?DDD8O:~~~:~~::::::::::~DDMNNM7$8O=?=??88$D~::::::::::::::::::::::::::::::
~~~~~~~::.DNN$:::~::::::::::::O8ND8N++~:?++?7OOI~:::::::::::::::::::::::::::::::
~~~~~~~~~:7NNN8DDO?::::::::::~7DD8ON:?+Z+?I7I8D8~:::::::::::::::::::::::::::::::
~~~~~~~:::~DN8DMN8O~::::::::::::ONNND$?~7I7$$ZNDDD88:::::::::::::::::::::::::::+
~~~~~~~:::+DNODD8DZ:~::::::::::,8DNN77I$7777$D8DNDNDD~:::::::::::::::::::::::~7O
~~~~~~~~~::ONONND88O::::::::,~ONMMNNNDDZZ$$IID8+DNNNDD~::::::::::::::::::~~~~I?$
~~~~~~~~~~~,8:NO=I+?~:::::,DNNMMMMMND$II7D777NO8+NNNDDD~::::::::::::::~=+~=~~I78
~~~~~~~:~~::+NMNOIO+$+:::ODNNNMMMMMMMNNNN77$I8ZODNNDDND7:~:::::::~~=?:~:~~+~++7:
~~~~~~~~::~:DNNMD?++?+:?I+~+DNMMMMMMMNDDDD8Z$I:ONNNNNNN8~:~~=~~~~:=~+:+~~=?++7::
~~~~~~:~~~::DNNN$==~+I$=~~:~~7NNMMMND$OOZ7Z$I=+NNDNNNNND~::~~~:~:~==+~+=+??I88::
~~~~~~~~~~:~7NNN?=~IZ+==~::,,:DNNNM$=~:~~:+ZI=ONNNNNNNNN8++~:~:~=+=+?=?+?ZZ~::::
~~~~~~~~~~~~:DNNNDND+I~~=~::::ONNMNMDNNMMNO+?==,DNNNNMNNND:==~=+=I++7IZ:::::::::
~~~~~~~~~~~~::ONNNN7I~:::::=::$NMMNMMMMNMMN~???$~NNNMNNMNN8~=?7+77?Z~:::::::::::
~~~~~~~:~~::::NNNNDZ+?~:::::+INNMMMMMMNMMNNZ~I?=DINNMNNNNO7$+I7O$:::::::::::::::
~~~~~~~~~::::ZNNNNN87?~,:==~ZOMMMMMMMMNNMMN~?I++O,?NMMMN8::,::::::::::::::::::::
~~~~~~~~:::::$NNMNNDO$=,~I+ZDMMMMMMMMMNNMMN+?~II$$,8NMNND:::::::::::::::::::::::
~~~~~~~:~~::::8NND88D?=~?I+DMMMMMMMMMMMNMNDI$7=I7Z=+NNNND:::::::::::::::::::::::
~~~~~~~~~:::::88DDOOZ$?=:~NMMMMMMMMMMMMMNNO::7Z=Z+~?NMMND~::::::::::::::::::::::
~~~~~~~~~:~:~:?DDDDDDO?~8NMMMMMMMMMMMMMMNN88OZ?+==~=DMMMNND=::::::::::::::::::::
~~~~~~~~~~:~:::ODDDDDZ~:DNMMMMMMMMMMMMMMNN+==+~~+===8MMMNNND8:::::::::::::::::::
~~~~~~~~~~~~~~~:Z887::::,NMMMMMMMMMMMMMMMN77II?=?===$NMMMNNND$::::::::::::::::::
</pre>

⚠️ _**Warning**_

> Look. I'm going to be honest with you: if you keep reading, you're gonna run into a raft of contrived Star Wars references, OK?

For those unfamiliar with "[progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)", it's essentially a technique of implementing functionality in a manner that starts with something very basic and dresses it up when the runtime environment is confirmed to offer some specific capabilities.  In the case of Consolo, it simply means that the library overrides the `console` object's logging methods, allowing calls to those methods to be fulfilled by more robust logging libraries.

The upshot is that calling `console.log('debug', 'some text')` will send the text `some text` to the configured logger (which, one imagines, is configured to output at some appropriate level, presumably with a timestamp prefix, and perhaps other formatting options), as a `debug` level message.

This can be especially useful to library package authors, as it allows them to avoid forcing any particular logging dependencies upon dependent codebases.  In fact, thanks to Consolo's "progressive enhancement"-style implementation, your library's logging statements will even work perfectly in apps that use _no_ logging library, at all!

## Usage

"OK," I hear you muttering, "show me some code, already."  Let's have a look at an example that that routes console messages to the widely-used [`winston` logger](https://www.github.com/winstonjs/winston).

First, install consolo and the winston adaptor to your project:

```sh
npm install --save consolo consolo-adaptor-winston winston
```

Next, create `lib.js`, `app-no-consolo.js`, and `app-consolo.js` files, as follows:

```js
// lib.js ================================
module.exports = {
  doSomething: () => {
    console.log('warn', 'a warning message');
    console.log('debug', 'some debug message');
    console.error('this works, too!');
  }
};

// app-no-consolo.js =====================
const lib = require('./lib');

lib.doSomething();

// app-consolo.js ========================
const { enhanceConsole } = require('consolo');
const WinstonAdaptor = require('consolo-adaptor-winston');
const winston = require('winston');

const lib = require('./lib');

// configure your logger
winston.configure({
  level: 'warn',
  transports: [
    new winston.transports.File('./my-output.log')
  ]
});

// use an instance of the adaptor to enhance the console object
enhanceConsole(new WinstonAdaptor(winston));

lib.doSomething();
```

Now, let's execute `app-no-consolo.js` and `app-consolo.js` and review their output:

```sh
$ node app-no-cosolo.js
warn a warning message
debug some debug message
this works, too!

$ node app-consolo.js
# no output, because of the winston transport config
$ cat my-output.log
warn: a warning message
error: this works, too!
```

Note first and foremost that the console methods called in `lib.js` function perfectly from within an app that doesn't use Consolo (in this case, the `app-no-consolo.js` script.  This is where the "progressive enhancement" implementation direction really shines for the library author—code intended for use with a Consolo-capable application works perfectly well with any out-of-the-box Node app.

When apps do elect to use Consolo, however, those `console` method calls start getting "dressed up".  Note, for example, the absence of output from the `app-consolo.js` script, because we configured winston to log to the `my-output.log` file.  Additionally, note the misisng `debug` level message, which didn't make it to the logger output because we configured winston to ignore any messages lower that the `warn` level.

And yes, you may have guessed it: custom adaptors can be written to support additional logging solutions—even proprietary ones.  We'll get to that in a bit.

### Library Authors

When you're writing a library, you'll want to keep the following things in mind:

- All calls to `console.log()` should start with a `level` string as a first argument.
- Do _not_ include a `level` string as a first argument when using `console.warn()`, `console.info()`, etc., as the level is automatically implied.
- If you're using [ESLint](https://eslint.org), make sure the `no-console` rule is disabled (at least for the server-side code).
- You may _optionally_ want to consider adding `consolo` as a peer dependency to indicate to dependent projects that your library supports it, but that's entirely up to you.

### Application Authors

It's at the app level that you'll want to add `consolo` (along with whatever adaptor is needed to support the logging library you intend to use) as a dependency.

To repeat the earlier example demonstrating winston logging, simply install:

```sh
npm install --save consolo consolo-adaptor-winston winston
```

And add the following lines to your application's initialization script:

```js
const { enhanceConsole } = require('consolo');
const WinstonAdaptor = require('consolo-adaptor-winston');
const winston = require('winston');

winston.configure({
  // configure winston
});

enhanceConsole(new WinstonAdaptor(winston));
```

And Owen's your uncle.

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
      .getLevelNamesAsArray()
      .includes(level);
  }

  log(level, ...messages) {
    this.logger.log(level, ...messages);
  }
}
```

JavaScript doesn't support interfaces, which is mildly unfortunate, so I've decided to offer a `BaseAdaptor` class and made it so that Consolo applies validation to adaptor instances it's asked to use.  (Note that the `BaseAdaptor` is optional, but gives you a basic—and unit-tested—`#enhanceConsole()` method implementation to work with.)

At the end of the day, an adaptor instance must include the following methods:

- `enhanceConsole([object] target)`: this method decorates `target` with the overridden `console` object methods.  I know, you're wondering why its necessary to explicitly pass `console` as an argument, given it's a global flippin' object.  In short, it's got to do with testability.
- `isLogLevel([string] level)`: answers whether the string in question is one of the configured logging levels.
- `log([string] level, ...)`: sends a log message with the specified level to an instance of whatever logger it supports.

It should be painless to implement an adaptor for whatever logger you like.  And, if you'd like to implement an adaptor for a community-maintained logger that isn't yet available (and you'd like to share your adaptor with the community), please check out the [contribution guidelines](https://github.com/prometheas/consolo-monorepo/blob/master/CONTRIBUTING.md)!

### API

Coming soon.

## Project Info

This is part of the [Consolo monorepo](https://github.com/prometheas/consolo-monorepo), hosted on Github.  Learn all you like aobut the project, its MIT licensing, and more there.
