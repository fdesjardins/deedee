import fs from 'fs';
import os from 'os';
import path from 'path';
import chalk from 'chalk';
import table from 'text-table';
import walk from 'walk';
import _ from 'lodash';

const colorMap = {
	node: {
		dependencies: {
			title: chalk.underline.blue,
			item: chalk.blue
		},
		devDependencies: {
			title: chalk.underline.green,
			item: chalk.green
		}
	},
	bower: {
		dependencies: {
			title: chalk.underline.red,
			item: chalk.red
		},
		devDependencies: {
			title: chalk.underline.magenta,
			item: chalk.magenta
		}
	}
};

function print(deps) {
	var dependencies = deps.dependencies;
	var devDependencies = deps.devDependencies;

	if (deps.type === 'node') {
		if (deps.dependencies.length > 0) {
			const titleColor = colorMap.node.dependencies.title;
			console.log(titleColor(`${deps.projectName} - package.json (dependencies)`));
			console.log(table(_.map(dependencies, dep => {
				const itemColor = colorMap.node.dependencies.item;
				return [itemColor(dep.name), itemColor(dep.version)];
			})));
			console.log(os.EOL);
		}

		if (deps.devDependencies.length > 0) {
			const titleColor = colorMap.node.devDependencies.title;
			console.log(titleColor(`${deps.projectName} - package.json (devDependencies)`));
			console.log(table(_.map(devDependencies, dep => {
				const itemColor = colorMap.node.devDependencies.item;
				return [itemColor(dep.name), itemColor(dep.version)];
			})));
			console.log(os.EOL);
		}
	}
	else if (deps.type === 'bower') {
		if (deps.dependencies.length > 0) {
			const titleColor = colorMap.bower.dependencies.title;
			console.log(titleColor(`${deps.projectName} - bower.json (dependencies)`));
			console.log(table(_.map(dependencies, dep => {
				const itemColor = colorMap.bower.dependencies.item;
				return [itemColor(dep.name), itemColor(dep.version)];
			})));
			console.log(os.EOL);
		}

		if (deps.devDependencies.length > 0) {
			const titleColor = colorMap.bower.devDependencies.title;
			console.log(titleColor(`${deps.projectName} - bower.json (devDependencies)`));
			console.log(table(_.map(devDependencies, dep => {
				const itemColor = colorMap.bower.devDependencies.item;
				return [itemColor(dep.name), itemColor(dep.version)];
			})));
			console.log(os.EOL);
		}
	}
}

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

function detectBower (root, filename) {
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

	console.log(os.EOL);

	if (options.recursive) {

		var walker = walk.walk(options.path, {
			followLinks: false,
			filters: ['node_modules', 'bower_components']
		});

		walker.on('file', (root, fstat, next) => {
			if (fstat.name == 'package.json') {
				print(detectNode(root));
			}

			if (fstat.name == 'bower.json') {
				print(detectBower(root));
			}
			next();
		});

	}
	else {
		const packageJsonPath = `${options.path}/package.json`;
		const bowerJsonPath = `${options.path}/bower.json`;

		if (fs.existsSync(packageJsonPath)) {
			print(detectNode(options.path));
		}

		if (fs.existsSync(bowerJsonPath)) {
			print(detectBower(options.path));
		}
	}
}
