bundler
=======

Internal tool for bundling

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bundler.svg)](https://npmjs.org/package/bundler)
[![Downloads/week](https://img.shields.io/npm/dw/bundler.svg)](https://npmjs.org/package/bundler)
[![License](https://img.shields.io/npm/l/bundler.svg)](https://github.com/GEUT/ui-components/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @geut/bundler
$ bundler COMMAND
running command...
$ bundler (-v|--version|version)
@geut/bundler/0.0.0 darwin-x64 node-v12.3.1
$ bundler --help [COMMAND]
USAGE
  $ bundler COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bundler build [INPUT]`](#bundler-build-input)
* [`bundler help [COMMAND]`](#bundler-help-command)

## `bundler build [INPUT]`

Build your source files into cjs, esm or umd formats.

```
USAGE
  $ bundler build [INPUT]

ARGUMENTS
  INPUT  source code entry point

OPTIONS
  -e, --environment=environment  [default: production] Environment
  -f, --formats=formats          [default: umd,cjs,esm] Output formats

DESCRIPTION
  ...
  You can build for development or production.
```

_See code: [src/commands/build.js](https://github.com/GEUT/ui-components/blob/v0.0.0/src/commands/build.js)_

## `bundler help [COMMAND]`

display help for bundler

```
USAGE
  $ bundler help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_
<!-- commandsstop -->
