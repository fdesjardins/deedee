import fs from 'fs';
import os from 'os';
import chalk from 'chalk';

function detectNodeDependencies(json) {
	console.log(chalk.bgBlue('Node.js: devDependencies'));
	for (const dep in json.devDependencies) {
		if (json.devDependencies.hasOwnProperty(dep)) {
			console.log(chalk.blue(`${dep} ${json.devDependencies[dep]}`));
		}
	}
}

function detectNodeDevDependencies(json) {
	console.log(chalk.bgGreen('Node.js: dependencies'));
	for (const dep in json.dependencies) {
		if (json.dependencies.hasOwnProperty(dep)) {
			console.log(chalk.green(`${dep} ${json.dependencies[dep]}`));
		}
	}
}

function detectBowerDependencies(json) {
	console.log(chalk.bgRed("Bower: dependencies"));
	for (const dep in json.dependencies) {
		if (json.dependencies.hasOwnProperty(dep)) {
			console.log(chalk.red(`${dep} ${json.dependencies[dep]}`));
		}
	}
}

function detectBowerDevDependencies(json) {
	console.log(chalk.bgMagenta("Bower: devDependencies"));
	for (const dep in json.devDependencies) {
		if (json.dependencies.hasOwnProperty(dep)) {
			console.log(chalk.magenta(`${dep} ${json.dependencies[dep]}`));
		}
	}
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
