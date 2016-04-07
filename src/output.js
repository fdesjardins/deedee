import os from 'os';
import chalk from 'chalk';
import table from 'text-table';
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
	},
	composer: {
		require: {
			title: chalk.underline.cyan,
			item: chalk.cyan
		},
		'require-dev': {
			title: chalk.underline.yellow,
			item: chalk.yellow
		}
	}
};

export function printToConsole(allDependencies) {
	for (const deps of allDependencies) {
		if (deps.type === 'node') {
			if (deps.dependencies.length > 0) {
				const titleColor = colorMap.node.dependencies.title;
				console.log(titleColor(`${deps.projectName} - package.json (dependencies)`));
				console.log(table(_.map(deps.dependencies, dep => {
					const itemColor = colorMap.node.dependencies.item;
					return [itemColor(dep.name), itemColor(dep.version)];
				})));
				process.stdout.write(os.EOL);
			}

			if (deps.devDependencies.length > 0) {
				const titleColor = colorMap.node.devDependencies.title;
				console.log(titleColor(`${deps.projectName} - package.json (devDependencies)`));
				console.log(table(_.map(deps.devDependencies, dep => {
					const itemColor = colorMap.node.devDependencies.item;
					return [itemColor(dep.name), itemColor(dep.version)];
				})));
				process.stdout.write(os.EOL);
			}
		}	else if (deps.type === 'bower') {
			if (deps.dependencies.length > 0) {
				const titleColor = colorMap.bower.dependencies.title;
				console.log(titleColor(`${deps.projectName} - bower.json (dependencies)`));
				console.log(table(_.map(deps.dependencies, dep => {
					const itemColor = colorMap.bower.dependencies.item;
					return [itemColor(dep.name), itemColor(dep.version)];
				})));
				process.stdout.write(os.EOL);
			}

			if (deps.devDependencies.length > 0) {
				const titleColor = colorMap.bower.devDependencies.title;
				console.log(titleColor(`${deps.projectName} - bower.json (devDependencies)`));
				console.log(table(_.map(deps.devDependencies, dep => {
					const itemColor = colorMap.bower.devDependencies.item;
					return [itemColor(dep.name), itemColor(dep.version)];
				})));
				process.stdout.write(os.EOL);
			}
		} else if (deps.type === 'php (composer)') {
			if (deps.require.length > 0) {
				const titleColor = colorMap.composer.require.title;
				console.log(titleColor(`${deps.projectName} - composer.json (require)`));
				console.log(table(_.map(deps.require, dep => {
					const itemColor = colorMap.composer.require.item;
					return [itemColor(dep.name), itemColor(dep.version)];
				})));
				process.stdout.write(os.EOL);
			}

			if (deps['require-dev'].length > 0) {
				const titleColor = colorMap.composer['require-dev'].title;
				console.log(titleColor(`${deps.projectName} - composer.json (require-dev)`));
				console.log(table(_.map(deps['require-dev'], dep => {
					const itemColor = colorMap.composer['require-dev'].item;
					return [itemColor(dep.name), itemColor(dep.version)];
				})));
				process.stdout.write(os.EOL);
			}
		}
	}
}
