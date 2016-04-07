/* global describe, it */

import chai from 'chai';
import { exec } from 'child-process-promise';
import stripAnsi from 'strip-ansi';
import 'babel-polyfill';

import config from '../package.json';

chai.should();

describe('deedee-cli', () => {
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

	it('should output dependencies to the console', () => {
		exec('node ./lib/deedee-cli.js -r ./test/fixture')
			.then(proc => {
				const output = stripAnsi(proc.stdout);
				output.should.match(/package.json/);
				output.should.match(/(dependencies)/);
				output.should.match(/glob/);
				output.should.match(/\^1.3.0/);
				output.should.match(/bower.json/);
				output.should.match(/(devDependencies)/);
				output.should.match(/moment/);
				output.should.match(/\^2.12.0/);
			});
	});
});
