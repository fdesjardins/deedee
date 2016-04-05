/* global describe, it */

import chai from 'chai';
import 'babel-polyfill';

import * as packageJson from './fixture/package.json';
import * as bowerJson from './fixture/bower.json';

import { __RewireAPI__ as deedeeRewireAPI } from '../lib/deedee.js';

describe('deedee', () => {

	const extractNodeOrBower = deedeeRewireAPI.__get__('extractNodeOrBower');

	describe('package.json', () => {
		let deps = [
			{ name: 'assert', version: '^1.3.0' },
			{ name: 'glob', version: '^5.0.15' },
			{ name: 'has', version: '^1.0.0' },
			{ name: 'lodash', version: '^4.6.1' }
		];

		let devDeps = [
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
});
