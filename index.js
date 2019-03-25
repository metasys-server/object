#!/usr/bin/env node
/* eslint-disable no-console */
const _ = require('@metasys/nodekit');
const { promptPassword, processArguments } = require('./lib/helpers');

const { MetasysServerApi, Reference } = _;

async function main() {
  const options = processArguments();
  const reference = new Reference(options.reference);

  // prompt for password if not set already
  const password = options.password || promptPassword();
  const hostname = options.hostname || reference.siteName;

  const api = new MetasysServerApi();
  const successful = await api.login(options.username, password, hostname, options.options);

  if (!successful) {
    return;
  }

  const queryParameters = { fqr: reference.reference };
  const objectId = await api.get(`https://${hostname}/api/objectIdentifiers`, queryParameters);
  const object = await api.get(`/objects/${objectId}`);

  console.log(JSON.stringify(object, null, 2));
}

main();
