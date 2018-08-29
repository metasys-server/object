const readlineSync = require('readline-sync');
const parseArgs = require('minimist');
const fs = require('fs');

function promptPassword() {
  return readlineSync.question('Password: ', { hideEchoBack: true });
}


function processArguments() {
  const args = parseArgs(process.argv.slice(2), { boolean: 'insecure' });

  const options = {};

  // Read file if one specified and set options from within it
  const filename = args.f;
  if (filename) {
    const file = JSON.parse(fs.readFileSync(filename));

    options.username = file.username;
    options.hostname = file.hostname;
    options.password = file.password;
  }

  // If not set yet, check command line switches
  const setOptionFromCommandLine = (propertyName, shortProperty) => {
    if (!options[propertyName]) {
      options[propertyName] = args[shortProperty] || args[propertyName];
    }
  };
  setOptionFromCommandLine('username', 'u');
  setOptionFromCommandLine('hostname', 'h');
  setOptionFromCommandLine('password', 'p');

  // If still not set, check env variables
  if (!options.username) {
    options.username = process.env.METASYS_USERNAME;
  }
  if (!options.hostname) {
    options.hostname = process.env.METASYS_HOSTNAME;
  }

  if (args.ca) {
    options.options = { ca: fs.readFileSync(args.ca) };
  }

  if (args.insecure) {
    options.options = { strictSSL: false };
  }

  [options.reference] = args._;

  if (!options.reference) {
    throw new Error('No reference string provided');
  }

  if (!options.username) {
    throw new Error('No username provided');
  }

  return options;
}

module.exports = { promptPassword, processArguments };
