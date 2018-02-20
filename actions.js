const chalk = require('chalk');
const {
  execute,
  generateRandomAddress,
  getAllInterfaces,
  getInterfaceSuggestion,
  getMacAddressByIntf,
  padRight
} = require('./helpers');

module.exports.displayAll = () => {
  const allInterfaces = getAllInterfaces();
  const intfFormatter = intf => `(${intf}):  `;
  const padding = allInterfaces.reduce((acc, intf) => {
    const { length } = intfFormatter(intf);
    acc = length > acc ? length : acc; // eslint-disable-line no-param-reassign
    return acc;
  }, 10);

  allInterfaces.forEach((intf) => {
    const address = getMacAddressByIntf(intf);
    const { result } = address;

    if (result) {
      const formattedAddress = result.substr(0, 17).toUpperCase();
      const paddedIntf = padRight(padding, intfFormatter(intf));
      console.log(`${paddedIntf}${chalk.green(formattedAddress)}`);
    }
  });
};

module.exports.displayAddress = (intf) => {
  const address = getMacAddressByIntf(intf);
  const { error, result } = address;

  if (error) {
    return console.log(chalk.red('Unable to find MAC address'));
  }

  if (result) {
    const formattedAddress = result.substr(0, 17).toUpperCase();
    return console.log(`The MAC address for (${chalk.bold(intf)}) is: ${chalk.green(formattedAddress)}`);
  }

  const validInterfaces = getAllInterfaces();
  const interfaceSuggestion = getInterfaceSuggestion(intf, validInterfaces);
  return console.log(interfaceSuggestion);
};

module.exports.setAddress = (intf, address) => {
  if (!module.exports.validateAddress(address)) {
    return console.log(`The MAC address provided (${chalk.red(address)}) is invalid`);
  }

  const execution = execute(`sudo ifconfig ${intf} ether ${address}}`);
  const { error } = execution;

  if (error) { return console.log(chalk.red('Unable to set MAC addess')); }
  return console.log(`Address for (${chalk.bold(intf)}) successfully changed to: ${chalk.green(address)}`);
};

module.exports.setRandomAddress = (intf) => {
  const randomAddress = generateRandomAddress();
  const validInterfaces = getAllInterfaces();
  const isValid = validInterfaces.indexOf(intf) !== -1;

  if (isValid) {
    return module.exports.setAddress(intf, randomAddress);
  }

  const suggestion = getInterfaceSuggestion(intf, validInterfaces);
  return console.log(suggestion);
};

module.exports.validateAddress = (address) => {
  const regex = /^([0-9a-f]{2}([:-]|$)){6}$|([0-9a-f]{4}([.]|$)){3}$/i;
  return regex.test(address);
};
