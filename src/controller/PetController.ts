import { PetRepository } from '../repository/PetRepository';
import { mongoService } from '../model/mongodb/MongoService';

const view = async (req, res) => {
  const petRepo = new PetRepository(mongoService);
  const current = await petRepo.getCoinAndHp();

  res.json({
             coins: current.coin,
             hp: current.hp,
           });
};

const savePetState = async (req, res) => {
  const petRepo = new PetRepository(mongoService);

  const { coin, hp } = req.body;

  await petRepo.setCoinAndHp(coin, hp);

  res.sendStatus(200);
};

export default {
  savePetState,
  view,
};
