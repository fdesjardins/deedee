#!/usr/bin/env node

import yargs from 'yargs';
import deedee from './deedee.js';

import config from '../package.json';

const argv = yargs
  .usage('Detects your project\'s dependencies.\n\nUsage: $0 [options] [path-to-project]')
  .version('v', config.version)
  .alias('v', 'version')
  .help('h')
	.alias('help', 'h')
	.boolean('r')
	.alias('recursive', 'r')
  .argv;

const options = {
	path: argv._[0],
	recursive: argv.recursive
};

deedee(options);
