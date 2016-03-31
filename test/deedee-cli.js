/* global describe, it */

import chai from 'chai';
import { exec } from 'child-process-promise';
import 'babel-polyfill';

import * as deedee from '../lib/deedee-cli.js';

import config from '../package.json';

chai.should();

describe('deedee', () => {
	it('should display the help screen', () => {
		exec('node ./lib/deedee-cli.js --help')
		.then(proc => {
			proc.stdout.should.match(/Detects your project's dependencies./);
		});
	});

	it('should display the version', () => {
		exec('node ./lib/deedee-cli.js --version')
			.then(proc => {
				proc.stdout.should.match(config.version);
			});
	});

	it('should demand at least one non-option argument', () => {
		exec('node ./lib/deedee-cli.js')
			.then(proc => {
				proc.stdout.should.match(/Not enough non-option arguments/);
			});
	});
});
