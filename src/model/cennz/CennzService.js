import { Api } from '@cennznet/api';
import { Keyring } from '@polkadot/keyring';
import fs from 'fs';
import Config from '../../util/Config';

const RATA_PROVIDER = 'wss://nikau.centrality.me/public/ws';

const collectionId = 5;

const accountAddress = Config.CENNZNET_ADDRESS;

/**
 * Creates an API client to access CennzNet services.
 */
async function createClient() {
  // Create the API and wait until ready
  const api = await Api.create({ provider: RATA_PROVIDER });

  console.log('[Server] CennzNet connected');

  return api;
}

/**
 * Get details of a client.
 */
async function getClientDetails(client) {
  // Retrieve the chain & node information information via rpc calls
  const values = await Promise.all([client.rpc.system.chain(),
                                     client.rpc.system.name(),
                                     client.rpc.system.version()]);

  return {
    chain: values[0],
    name: values[1],
    version: values[2],
  };
}

/**
 * Gets the current user identity (stored in the file) and returns it.
 */
const generateIdentity = () => {
  const keyring = new Keyring({ type: 'sr25519' });
  const json = JSON.parse(fs.readFileSync('private_keys/cennznet_key.json').toString());

  const identity = keyring.addFromJson(json);
  identity.decodePkcs8(Config.CENNZNET_PWD);

  return identity;
};


export default {
  accountAddress,
  collectionId,
  createClient,
  getClientDetails,
  generateIdentity,
};
