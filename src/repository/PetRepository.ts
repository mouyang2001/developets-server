import { Collection, ObjectId } from 'mongodb';
import { Pet } from '../model/Pet';
import { MongoService } from '../model/mongodb/MongoService';

class PetRepository {
  private petCollection: Collection<any>;

  constructor(mongoService: MongoService) {
    this.petCollection = mongoService.db.collection('pets');
  }

  async getCoinAndHp() {
    const dbo = (await this.petCollection.find({}).toArray())[0];

    return {
      coin: dbo.coin,
      hp: dbo.hp,
    }
  }

  async setCoinAndHp(coin: number, hp: number) {
    const filter = {}
    const query = { "$set": {
        coin: coin,
        hp: hp
      }}

    const dbo = this.petCollection.updateOne(filter, query);
  }

  async setCoin(coin: number) {
    const filter = {}
    const query = { "$set": {
      coin: coin
    }}

    const dbo = this.petCollection.updateOne(filter, query);
  }

  /**
   * Get a pet based on the organisation's ID (as a Pet belongs to an organisation/team).
   * @param orgId
   */
  async getPetByOrgId(orgId: string): Promise<Pet> {
    const dbo = await this.petCollection.findOne({ 'orgId': new ObjectId(orgId) });

    if (dbo) {
      return <Pet>dbo;
    }
  }

  /**
   * Lists all `pet`s in the collection.
   */
  async list(): Promise<Pet[]> {
    const dboList = await this.petCollection.find({}).toArray();

    return dboList.map((dbo) => <Pet>dbo);
  }

  /**
   * Saves a `pet` to the collection.
   */
  async save(pet: Pet) {
    if (pet._id) {

      const filter = { '_id': new ObjectId(pet._id) };
      const query = { '$set': pet };
      const options = { upsert: true };

      await this.petCollection.updateOne(filter, query, options);
    }
  }

}


export {
  PetRepository,
};
