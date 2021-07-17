import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const CENNZNET_PWD = process.env.CENNZNET_PWD;
const CENNZNET_ADDRESS = process.env.CENNZNET_CLIENT_KEY;

export default {
  CENNZNET_ADDRESS,
  MONGODB_URI,
  CENNZNET_PWD,
};
