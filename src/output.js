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
	}
};

export function printToConsole(allDependencies) {
	for (const deps of allDependencies) {
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
		}	else if (deps.type === 'bower') {
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
}
