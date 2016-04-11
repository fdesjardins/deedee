import os from 'os';
import path from 'path';
import chalk from 'chalk';
import table from 'text-table';
import _ from 'lodash';

export function printToConsole(allDependencies) {
	process.stdout.write(os.EOL);

	for (const deps of allDependencies) {
		if (deps.type === 'Node.js') {
			if (deps.dependencies.length > 0) {
				console.log(chalk.yellow(path.join(deps.path, 'package.json')));
				console.log(`Name: ${deps.projectName}`);
				console.log(`Type: ${deps.type} (dependencies)\n`);
				console.log(table(_.map(deps.dependencies, dep => {
					return [' ', dep.name, dep.version];
				})));
				process.stdout.write(os.EOL);
			}

			if (deps.devDependencies.length > 0) {
				console.log(chalk.yellow(path.join(deps.path, 'package.json')));
				console.log(`Name: ${deps.projectName}`);
				console.log(`Type: ${deps.type} (devDependencies)\n`);
				console.log(table(_.map(deps.devDependencies, dep => {
					return [' ', dep.name, dep.version];
				})));
				process.stdout.write(os.EOL);
			}
		}	else if (deps.type === 'Bower') {
			if (deps.dependencies.length > 0) {
				console.log(chalk.yellow(path.join(deps.path, 'bower.json')));
				console.log(`Name: ${deps.projectName}`);
				console.log(`Type: ${deps.type} (dependencies)\n`);
				console.log(table(_.map(deps.dependencies, dep => {
					return [' ', dep.name, dep.version];
				})));
				process.stdout.write(os.EOL);
			}

			if (deps.devDependencies.length > 0) {
				console.log(chalk.yellow(path.join(deps.path, 'bower.json')));
				console.log(`Name: ${deps.projectName}`);
				console.log(`Type: ${deps.type} (devDependencies)\n`);
				console.log(table(_.map(deps.devDependencies, dep => {
					return [' ', dep.name, dep.version];
				})));
				process.stdout.write(os.EOL);
			}
		} else if (deps.type === 'PHP/Composer') {
			if (deps.require.length > 0) {
				console.log(chalk.yellow(path.join(deps.path, 'composer.json')));
				console.log(`Name: ${deps.projectName}`);
				console.log(`Type: ${deps.type} (require)\n`);
				console.log(table(_.map(deps.require, dep => {
					return [' ', dep.name, dep.version];
				})));
				process.stdout.write(os.EOL);
			}

			if (deps['require-dev'].length > 0) {
				console.log(chalk.yellow(path.join(deps.path, 'composer.json')));
				console.log(`Name: ${deps.projectName}`);
				console.log(`Type: ${deps.type} (require-dev)\n`);
				console.log(table(_.map(deps['require-dev'], dep => {
					return [' ', dep.name, dep.version];
				})));
				process.stdout.write(os.EOL);
			}
		}
	}
}
