const chalk = require('chalk');
const didyoumean = require('didyoumean');
const { execSync } = require('child_process');

module.exports.execute = (command) => {
  try {
    const options = { stdio: 'pipe' };
    const result = execSync(command, options).toString('utf8');
    return { error: null, result };
  } catch (e) {
    return { error: e.message, result: null };
  }
};

module.exports.generateRandomAddress = () => {
  return 'MM:MM:MM:MM:MM:MM'.replace(
    /M/g,
    () => '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16))
  );
};

module.exports.getAllInterfaces = () => {
  const interfacesString = module.exports.execute('ifconfig -l');
  const { error, result } = interfacesString;

  if (error) { return []; }
  return result.split(' ');
};

module.exports.getInterfaceSuggestion = (intf, interfaces) => {
  const suggestion = didyoumean(intf, interfaces);
  const generalError = `Interface (${chalk.red(intf)}) does not exist.`;

  return suggestion
    ? `${generalError} Did you mean ${chalk.green(suggestion)}?`
    : generalError;
};
