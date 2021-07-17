import { Db, MongoClient } from 'mongodb';
import Config from '../../util/Config';

class MongoService {
  private readonly client: MongoClient;
  private readonly dbName: string;

  public db: Db;

  constructor(uri: string, dbName: string) {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.dbName = dbName;
  }

  init() {
    this.client.connect(error => {
      if (error) {
        console.log(error);
      } else {
        this.db = this.client.db(this.dbName);
        console.log('[Server] MongoDB connected');
      }
    });
  }
}


const mongoService = new MongoService(Config.MONGODB_URI, 'developets-prod');
mongoService.init();

export {
  mongoService,
  MongoService,
};
