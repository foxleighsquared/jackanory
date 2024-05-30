#! /usr/bin/env node

import axios from 'axios';
import config from '../package.json' assert { type: 'json' };
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';

console.log(chalk.blue('Checking for updates to Jackanory...\r\n'));
const currentVersion = config.version;
/**
 * Check the currently installed version of jackanory against the latest version.
 */
axios
  .get(
    'https://raw.githubusercontent.com/foxleigh81/jackanory/master/package.json',
    {
      validateStatus: () => true
  })
  .then((response) => {
    if (!response.data) return;
    let version = {
      outdated: false,
      current: currentVersion,
      latest: currentVersion
    };
    if (response.data.version > currentVersion) {
      version = {
        outdated: true,
        current: currentVersion,
        latest: response.data.version
      };
      console.warn(
        `${chalk.red(
          'A new version of Jackanory is available\r\n'
        )} \r\n${chalk.bold(
          'Current version:'
        )} v${currentVersion}\r\n${chalk.bold('Latest version:')} v${
          response.data.version
        }\r\n`
      );
    } else {
      console.log(chalk.green('Jackanory is up to date.\r\n'));
    }
    let contents = `export const version = ${JSON.stringify(version)};`;

    fs.writeFileSync(path.resolve('./.storybook/version.ts'), contents);
  })
  .catch((error) => {
    console.log(error);
  });
