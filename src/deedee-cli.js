#!/usr/bin/env node

import yargs from 'yargs';
import deedee from './deedee.js';

import config from '../package.json';

let cli = yargs
  .usage('Detects project dependencies.\nUsage: deedee [path-to-project] [options]')
	.example('deedee ~/npm/yargs -r')
  .help('help')
	.alias('h', 'help')
	.boolean('r')
	.alias('r', 'recursive')
	.describe('r', 'Detects dependencies in nested projects')
	.version('v', config.version)
	.alias('v', 'version')

if (require.main === module) {
	cli.demand(1);
}

const argv = cli.argv;

const options = {
	path: argv._[0],
	recursive: argv.recursive
};

deedee(options);
