/* global describe, it */

import chai from 'chai';
import sinon from 'sinon';
import stripAnsi from 'strip-ansi';
import 'babel-polyfill';
import deedee from '../lib/deedee.js';

import * as packageJson from './fixture/package.json';
import * as bowerJson from './fixture/bower.json';

import { __RewireAPI__ as deedeeRewireAPI } from '../lib/deedee.js';

chai.should();

describe('deedee', () => {

	describe('output', () => {
		before(() => {
			sinon.stub(console, 'log').returns(void 0);
		});

		after(() => {
			console.log.restore();
		});

		it('should write dependencies to the console', () => {
			const options = {
				path: __dirname + '/fixture',
				recursive: false
			};
			deedee(options);

			console.log.called.should.be.true;

			// strip the chalk ansi color codes from the output
			const output = stripAnsi(console.log.args.toString());
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

	const extractNodeOrBower = deedeeRewireAPI.__get__('extractNodeOrBower');

	describe('package.json', () => {
		const deps = [
			{ name: 'assert', version: '^1.3.0' },
			{ name: 'glob', version: '^5.0.15' },
			{ name: 'has', version: '^1.0.0' },
			{ name: 'lodash', version: '^4.6.1' }
		];

		const devDeps = [
			{ name: 'babel-cli', version: '^6.6.5' },
		  { name: 'babel-core', version: '^6.7.2' },
		  { name: 'chai', version: '^3.5.0' }
		];

		it('should extract dependencies', () => {
			extractNodeOrBower(packageJson, 'dependencies')
				.should.deep.equal(deps);
		});

		it('should extract devDependencies', () => {
			extractNodeOrBower(packageJson, 'devDependencies')
				.should.deep.equal(devDeps);
		});

		it('should detect package.json properties', () => {
			const detectNode = deedeeRewireAPI.__get__('detectNode');
			detectNode(__dirname + '/fixture')
				.should.deep.equal({
					type: 'node',
		  		projectName: 'test',
				  dependencies: deps,
				  devDependencies: devDeps
				});
		});
	});

	describe('bower.json', () => {
		const deps = [
			{ name: 'bootstrap', version: '^3.3.6' },
		  { name: 'jquery', version: '^2.2.2' },
		  { name: 'font-awesome', version: 'fontawesome#^4.5.0' }
		];

		const devDeps = [
			{ name: 'moment', version: '^2.12.0' },
		  { name: 'async', version: '^1.5.2' },
		  { name: 'immutable', version: '^3.7.6' }
		];

		it('should extract dependencies', () => {
			extractNodeOrBower(bowerJson, 'dependencies')
				.should.deep.equal(deps);
		});

		it('should extract devDependencies', () => {
			extractNodeOrBower(bowerJson, 'devDependencies')
				.should.deep.equal(devDeps);
		});

		it('should detect bower.json properties', () => {
			const detectBower = deedeeRewireAPI.__get__('detectBower');
			detectBower(__dirname + '/fixture')
				.should.deep.equal({
					type: 'bower',
					projectName: 'test',
					dependencies: deps,
					devDependencies: devDeps
				});
		});
	});
});
