import cennzService from '../model/cennz/CennzService';
import { Organisation } from '../model/Organisation';

class AccessoryRepository {

  /**
   * Returns all accessories available in the collection.
   */
  async list(): Promise<Accessory[]> {
    const client = await cennzService.createClient();
    const collectionId = cennzService.collectionId;

    const tokenInfos = await client.derive.nft.tokenInfoForCollection(collectionId);

    return tokenInfos.filter((info) => {
      const accessoryId = parseInt(info.tokenId["seriesId"])

      // To filter out old accessories created for testing
      return ([0, 2, 3].indexOf(accessoryId) !== -1)
    }).map((info) => {
      const { tokenId, attributes, owner } = info;

      const getCost = (accessoryId: number) => ({
        0: 10,
        2: 15,
        3: 6,
      }[accessoryId])

      const accessoryId = parseInt(tokenId["seriesId"]);

      return <Accessory>{
        name: attributes[0].asText,
        media: attributes[1].asUrl,
        orgId: owner,

        cost: getCost(accessoryId),

        accessoryId: accessoryId,
        accessorySeries: parseInt(tokenId["serialNumber"])
      };
    });
  }

  /**
   * This returns all accessories that we (by our RATA organisation ID) own.
   */
  async listAvailableAccessories(): Promise<Accessory[]> {
    const accessories = await this.list()
    return accessories.filter((accessory: Accessory) => accessory.orgId === cennzService.accountAddress)
  }

  async create(accessory: Accessory) {
    const api = await cennzService.createClient();
    const identity = cennzService.generateIdentity();

    const collectionId = cennzService.collectionId;
    const owner = cennzService.accountAddress;
    const quantity = 8;

    /*
     * These attributes are saved inside the NFT that is minted, and cannot be changed.
     */
    const attributes = [
      {
        'Text': accessory.name,
      },

      // The URL of the video / document we are wanting to preserve
      { 'Url': accessory.media },

      // The time at which the NFT is created (i.e. now)
      { 'Timestamp': new Date().valueOf() },
    ];

    await api.tx.nft.mintSeries(collectionId, quantity, owner, attributes, null, null)
      .signAndSend(identity, {}, (res) => {
        console.log(res.toHuman());
      });

    return true;
  }

  async transfer(organisation: Organisation, accessoryId: number, accessorySerialNum: number) {
    const api = await cennzService.createClient();
    const identity = cennzService.generateIdentity();

    await api.tx.nft.transfer([cennzService.collectionId, accessoryId, accessorySerialNum], organisation.cennznetAddress)
      .signAndSend(identity, {}, (res) => {
        console.log(res.toHuman());
      });

    return true;
  }

}

export {
  AccessoryRepository,
};
