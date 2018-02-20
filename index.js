#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const actions = require('./actions');

// CLI entry point
program
  .arguments('<interface>')
  .description('View and change the MAC address for any interface')
  .option('-a, --all', 'display MAC addresses for available interfaces')
  .option('-d, --display', 'display current MAC address')
  .option('-r, --random', 'set random MAC address')
  .option('-s, --set <mac>', 'set MAC address for interface')
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
if (!program.all && !program.display && !program.set && !program.random) {
  console.log(chalk.red('  Please select an option...'));
  program.help();
}

// Show help if no interface was provided (unless we're displaying all)
if (program.all) {
  actions.displayAll();
} else if (program.args.length === 0) {
  console.log(chalk.red('  An interface is required...'));
  program.help();
}
