import fs from 'fs';
import os from 'os';
import chalk from 'chalk';
import table from 'text-table';

function detectNodeDependencies(json) {
	console.log(chalk.bgBlue('Node.js: devDependencies'));
	var out = [];
	for (const dep in json.devDependencies) {
		if (json.devDependencies.hasOwnProperty(dep)) {
			out.push([chalk.blue(dep), chalk.blue(json.devDependencies[dep])]);
		}
	}
	console.log(table(out));
}

function detectNodeDevDependencies(json) {
	console.log(chalk.bgGreen('Node.js: dependencies'));
	var out = [];
	for (const dep in json.dependencies) {
		if (json.dependencies.hasOwnProperty(dep)) {
			out.push([chalk.green(dep), chalk.green(json.dependencies[dep])]);
		}
	}
	console.log(table(out));
}

function detectBowerDependencies(json) {
	console.log(chalk.bgRed("Bower: dependencies"));
	var out = [];
	for (const dep in json.dependencies) {
		if (json.dependencies.hasOwnProperty(dep)) {
			out.push([chalk.red(dep), chalk.red(json.dependencies[dep])]);
		}
	}
	console.log(table(out));
}

function detectBowerDevDependencies(json) {
	console.log(chalk.bgMagenta("Bower: devDependencies"));
	var out = [];
	for (const dep in json.devDependencies) {
		if (json.dependencies.hasOwnProperty(dep)) {
			out.push([chalk.magenta(dep), chalk.magenta(json.dependencies[dep])]);
		}
	}
	console.log(table(out));
}

export default function (options) {
	const packageJsonPath = `${options.path}/package.json`;
	const bowerJsonPath = `${options.path}/bower.json`;

	if (fs.existsSync(packageJsonPath)) {
		console.log(os.EOL);

		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

		detectNodeDependencies(packageJson);

		console.log(os.EOL);

		detectNodeDevDependencies(packageJson);
	}

	if (fs.existsSync(bowerJsonPath)) {
		console.log(os.EOL);

		const bowerJson = JSON.parse(fs.readFileSync(`${options.path}/bower.json`));

		detectBowerDependencies(bowerJson);

		console.log(os.EOL);

		detectBowerDevDependencies(bowerJson);
	}

	console.log(os.EOL);

	if (fs.existsSync(bowerJsonPath)) {
		console.log(os.EOL);

		const bowerJson = JSON.parse(fs.readFileSync(`${options.path}/bower.json`));

		detectBowerDependencies(bowerJson);

		console.log(os.EOL);

		detectBowerDevDependencies(bowerJson);
	}

	console.log(os.EOL);
}
