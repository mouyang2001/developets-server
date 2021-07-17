import { AccessoryRepository } from '../repository/AccessoryRepository';

import cennzService from '../model/cennz/CennzService';

const createCollection = async (req, res, next) => {
  const api = await cennzService.createClient();
  const identity = cennzService.generateIdentity();

  const collectionName = 'developets-accessories-prod';
  const mdBaseUri = 'ipfs';

  let respCode = null;
  await api.tx.nft.createCollection(collectionName, mdBaseUri, null)
    .signAndSend(identity, {}, (res) => {
      console.log(res.status.toHuman(true));
    });

  res.json(200);
};


const mintToken = async (req, res) => {
  const repo = new AccessoryRepository();

  const accessory = {
    name: "Top Hat",
    media: "https://raw.githubusercontent.com/Ray-F/developets/master/docs/hat.png",
    orgId: null,

    cost: null,

    accessoryId: 0,
    accessorySeries: 0,
  }

  await repo.create(accessory)

  res.json("Test");
};

const list = async (req, res) => {
  const repo = new AccessoryRepository();

  res.json(await repo.listAvailableAccessories());
}


export default {
  createCollection,
  list,
  mintToken,
};
