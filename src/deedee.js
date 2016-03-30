import fs from 'fs';
import os from 'os';
import path from 'path';
import chalk from 'chalk';
import table from 'text-table';
import walk from 'walk';

function detectNodeDependencies(json) {
	var out = [];
	for (const dep in json.devDependencies) {
		if (json.devDependencies.hasOwnProperty(dep)) {
			out.push([chalk.blue(dep), chalk.blue(json.devDependencies[dep])]);
		}
	}
	console.log(table(out));
}

function detectNodeDevDependencies(json) {
	var out = [];
	for (const dep in json.dependencies) {
		if (json.dependencies.hasOwnProperty(dep)) {
			out.push([chalk.green(dep), chalk.green(json.dependencies[dep])]);
		}
	}
	console.log(table(out));
}

function detectBowerDependencies(json) {
	var out = [];
	for (const dep in json.dependencies) {
		if (json.dependencies.hasOwnProperty(dep)) {
			out.push([chalk.red(dep), chalk.red(json.dependencies[dep])]);
		}
	}
	console.log(table(out));
}

function detectBowerDevDependencies(json) {
	var out = [];
	for (const dep in json.devDependencies) {
		if (json.dependencies.hasOwnProperty(dep)) {
			out.push([chalk.magenta(dep), chalk.magenta(json.dependencies[dep])]);
		}
	}
	console.log(table(out));
}

function detectNode(root) {
	let configPath = path.join(root, 'package.json');
	let packageJson = JSON.parse(fs.readFileSync(configPath));
	let projectName = packageJson.name;

	console.log(os.EOL);

	console.log(chalk.bgBlue(`${projectName} - package.json (dependencies)`));
	detectNodeDependencies(packageJson);
	console.log(os.EOL);

	console.log(chalk.bgGreen(`${projectName} - package.json (devDependencies)`));
	detectNodeDevDependencies(packageJson);
}

function detectBower (root, filename) {
	let configPath = path.join(root, 'bower.json');
	let bowerJson = JSON.parse(fs.readFileSync(configPath));
	let projectName = bowerJson.name;

	console.log(os.EOL);

	console.log(chalk.bgRed(`${projectName} - bower.json (dependencies)`));
	detectBowerDependencies(bowerJson);
	console.log(os.EOL);

	console.log(chalk.bgMagenta(`${projectName} - bower.json (devDependencies)`));
	detectBowerDevDependencies(bowerJson);
}

export default function (options) {

	if (options.recursive) {

		var walker = walk.walk(options.path, {
			followLinks: false,
			filters: ['node_modules', 'bower_components']
		});

		walker.on('file', (root, fstat, next) => {
			if (fstat.name == 'package.json') {
				detectNode(root);
			}

			if (fstat.name == 'bower.json') {
				detectBower(root);
			}
			next();
		});

	}
	else {
		const packageJsonPath = `${options.path}/package.json`;
		const bowerJsonPath = `${options.path}/bower.json`;

		if (fs.existsSync(packageJsonPath)) {
			detectNode(options.path);
		}

		if (fs.existsSync(bowerJsonPath)) {
			detectBower(options.path);
		}
	}

	console.log(os.EOL);
}
