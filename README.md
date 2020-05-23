# Consolo Monorepo

Welcome to the multi-package git repository for the Consolo package, various related logger adaptors, and other supporting utilities.

[![Build Status](https://travis-ci.org/prometheas/consolo-monorepo.svg?branch=master)](https://travis-ci.org/prometheas/consolo-monorepo)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/prometheas/generator-multistack-tdd-kata.svg?columns=all)](https://waffle.io/prometheas/generator-multistack-tdd-kata)

## What is Consolo?

Consolo (pronounced—and this is absolutely critical to note—to rhyme with everyone's favorite carbonite-encased "scoundrel") is a light-weight library that applies "[progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)" atop Node's global in-built `console` object, allowing your app to connect it to a more featureful logger solution.  This technique of enhancing the `console` object allows library authors to issue log messages from their code that both works "out of the box" in any Node app, but that can also correctly map to whatever (presumably more sophisticated) logging solution an app deveoper might elect to use for their project.  Moreover, if you look at its name etymologically (using the term loosely, here—bear with me…), it reads as a portmanteau that suggest "using only `console`": _con(sole) + solo_.

Consolo is also, very notably, not at all [scruffy-looking](https://www.youtube.com/watch?v=gYoDBX1gobM).

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

⚠️ _**Warning**_ ⚠️

> Prepare yourself for a raft of self-indulgent, often painfully-contrived (and thoroughly unlicensed) Star Wars references ahead.  (Don't worry, though—I'll cite nothing from any material released after 1983.  Because I'm a fucking gentleman.)

You can learn more about [how to write Consolo-compliant libraries](./packages/consolo#library-authors), [how to effectively use compliant libraries in your app(s)](./packages/consolo#application-authors), and more [here](./packages/consolo/README.md#usage).

💫 If your library conforms to the Consolo logging convention, you can tell the world by adding this badge to your package's main README file:

```markdown
[![Consolo compatible](https://img.shields.io/badge/consolo-compatible-green.svg?longCache=true&style=flat)](https://github.com/prometheas/consolo-monorepo)
```

### What's In This Repository?

In this repository, you'll find a number of packages beyond the main Consolo library, each of which support its use in some way.  Many are "adaptors", which implement bindings necessary to integrate a number of different logger solutions, such as [Winston](https://www.github.com/winstonjs/winston) and [log-driver](https://www.npmjs.com/package/log-driver).

Browse the packages in the `packages` directory.

## Contributing

Interested in pitching in?  That's great.  I'd be grateful for feedback, ideas, bug fixes, and doc updates.  Please be aware of the following:

- Be nice to people.
- All contributions happen through Pull Requests.
- All code contributions must be accompanied by automated tests.

This project uses [conventional commits](https://conventionalcommits.org) for developer friendliness, and to facilitate automated compliance with [semantic versioning](http://semver.org/).

## Legal Stuff

In short, don't sue me.  Neither for my insufferable Star Wars references, nor for whatever harm my software did to your life.  Also, please feel free do whatever the hell you want with this.

### MIT License

Everything in here is MIT licensed.  More info [here](./LICENSE).

## Copyright Notice

Obviously, all the Star Wars stuff is copyright Lucasfilm.  I am in no way affiliated with any of those folks (except, obviously, by way of Kevin Bacon), and certainly didn't ask anyone's permission to subject the otherwise innocent Node developers world to these painfully belabored references.

Think of it as similar in spirit to fan fiction.  Except it's not fiction, and it's vastly less entertaining.
