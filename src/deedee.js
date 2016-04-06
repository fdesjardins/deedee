import fs from 'fs';
import path from 'path';
import walk from 'walk';
import _ from 'lodash';
import Promise from 'bluebird';

function extractNodeOrBower(json, fieldName) {
	return _.map(json[fieldName], (version, name) => {
		return {
			name: name,
			version: version
		};
	});
}

function detectNode(root) {
	let configPath = path.join(root, 'package.json');
	let packageJson = JSON.parse(fs.readFileSync(configPath));
	let projectName = packageJson.name;

	return {
		type: 'node',
		projectName: projectName,
		dependencies: extractNodeOrBower(packageJson, 'dependencies'),
		devDependencies: extractNodeOrBower(packageJson, 'devDependencies')
	};
}

function detectBower(root) {
	let configPath = path.join(root, 'bower.json');
	let bowerJson = JSON.parse(fs.readFileSync(configPath));
	let projectName = bowerJson.name;

	return {
		type: 'bower',
		projectName: projectName,
		dependencies: extractNodeOrBower(bowerJson, 'dependencies'),
		devDependencies: extractNodeOrBower(bowerJson, 'devDependencies')
	};
}

export default function (options) {
	let deps = [];

	if (options.recursive) {
		var walker = walk.walk(options.path, {
			followLinks: false,
			filters: ['node_modules', 'bower_components', '.git']
		});

		walker.on('file', (root, fstat, next) => {
			if (fstat.name === 'package.json') {
				deps.push(detectNode(root));
			}

			if (fstat.name === 'bower.json') {
				deps.push(detectBower(root));
			}
			next();
		});

		return new Promise(resolve => {
			walker.on('end', () => resolve(deps));
		});
	}

	const packageJsonPath = `${options.path}/package.json`;
	const bowerJsonPath = `${options.path}/bower.json`;

	if (fs.existsSync(packageJsonPath)) {
		deps.push(detectNode(options.path));
	}

	if (fs.existsSync(bowerJsonPath)) {
		deps.push(detectBower(options.path));
	}

	return Promise.resolve(deps);
}
