import fs from 'fs';
import os from 'os';
import chalk from 'chalk';
import Promise from 'bluebird';

Promise.promisifyAll(fs);

export default function (options) {
  fs.readFile(`${options.path}/package.json`, (err, data) => {
    const json = JSON.parse(data);

    console.log(os.EOL);

    console.log(chalk.bgGreen('Node.js: dependencies'));
    for (const dep in json.dependencies) {
      if (json.dependencies.hasOwnProperty(dep)) {
        console.log(chalk.green(`${dep} ${json.dependencies[dep]}`));
      }
    }

    console.log(os.EOL);

    console.log(chalk.bgBlue('Node.js: devDependencies'));
    for (const devDep in json.devDependencies) {
      if (json.devDependencies.hasOwnProperty(devDep)) {
        console.log(chalk.blue(`${devDep} ${json.devDependencies[devDep]}`));
      }
    }

    console.log(os.EOL);
  });
}
