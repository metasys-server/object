const readline = require('readline');
const parseArgs = require('minimist');
const fs = require('fs');

async function promptPassword() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.stdoutMuted = true;

  return new Promise((resolve) => {
    rl.question('Password: ', (password) => {
      resolve(password);
      rl.close();
    });

    /* eslint-disable-next-line no-underscore-dangle */
    rl._writeToOutput = function _writeToOutput(stringToWrite) {
      if (stringToWrite.includes('\n')) {
        rl.output.write(stringToWrite);
        return;
      }
      if (rl.stdoutMuted) { rl.output.write('*'); } else { rl.output.write(stringToWrite); }
    };
  });
}


function processArguments() {
  const args = parseArgs(process.argv.slice(2), { boolean: 'insecure' });

  const options = {};

  // Read file if one specified.
  const filename = args.f;

  if (filename) {
    const file = JSON.parse(fs.readFileSync(filename));

    options.username = file.username;
    options.hostname = file.hostname;
  }

  // If not set yet, check command line switches
  if (!options.username) {
    options.username = args.u || args.username;
  }
  if (!options.hostname) {
    options.hostname = args.h || args.hostname;
  }

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
