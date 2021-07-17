import { PetRepository } from '../repository/PetRepository';
import { mongoService } from '../model/mongodb/MongoService';


const githubEvent = async (req, res) => {
  const petRepo = new PetRepository(mongoService);

  console.log(req.body);
  const commitMsg = req.body['head_commit']['message'];

  const regex = /DEV-\d+/;

  if (commitMsg.search(regex) != -1) {
    res.json({
               status: 200,
               message: 'No bad practice found!',
             });
    return;
  }


  let { coin, hp } = await petRepo.getCoinAndHp();

  // Determine what the lowest punishment is (based on either halving HP or the linear penalty)
  const actualPenalty = Math.min(Math.round(hp / 2), 10);

  await petRepo.setCoinAndHp(coin, Math.round(hp) === 1 ? 1 : hp - actualPenalty);

  res.json({
             status: 200,
             message: `Deducted ${actualPenalty} health points for the bad practice!`,
           });

};

export default {
  githubEvent,
};
