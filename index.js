#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const actions = require('./actions');

// CLI entry point
program
  .arguments('<interface>')
  .description('View and change the MAC address for any interface')
  .option('-d, --display', 'Display the current MAC address')
  .option('-r, --random', 'Set a random MAC address')
  .option('-s, --set <mac>', 'Set the MAC address')
  .version('1.0.0', '-v, --version')
  .action((intf, commands) => {
    const { display, random, set } = commands;
    const { displayAddress, setRandomAddress, setAddress } = actions;

    if (display) {
      return displayAddress(intf);
    }

    if (set) {
      return setAddress(intf, set);
    }

    if (random) {
      return setRandomAddress(intf);
    }

    return null;
  });

// Parse command line arguments
program.parse(process.argv);

// Show help if no options provided
if (!program.display && !program.set && !program.random) {
  console.log(chalk.red('  Please select an option...'));
  program.help();
}

// Show help if no interface was provided
if (program.args.length === 0) {
  console.log(chalk.red('  An interface is required...'));
  program.help();
}
