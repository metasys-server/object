#!/usr/bin/env node
/* eslint-disable no-console */
const _ = require('@serverkit/serverkit');
const { promptPassword, processArguments } = require('./lib/helpers');

const { MetasysServerApi, Reference } = _;

async function main() {
  const options = processArguments();
  const reference = new Reference(options.reference);

  // prompt for password if not set already
  const password = options.password ? options.password : await promptPassword();

  if (!options.hostname) {
    options.hostname = reference.siteName;
  }


  const api = new MetasysServerApi();
  const successful = await api.login(options.username, password, options.hostname, options.options);

  if (!successful) {
    return;
  }

  const device = await _.first(api.supervisoryDevices(),
    element => element.itemReference === reference.engineReference);

  if (reference.isEngineReference) {
    console.log(JSON.stringify(device, null, 2));
    return;
  }

  const object = await _.first(api.objects({ deviceId: device.id }),
    element => element.itemReference === options.reference);

  console.log(JSON.stringify(object, null, 2));
}

main();
