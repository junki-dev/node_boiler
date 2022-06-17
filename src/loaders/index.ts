import path from 'path';
import { helper } from '../common/logger';
import { boilerError } from '../common/boilerMessage';
import expressLoader from './express';
import mongooseLoader from './mongoose';

const init = async (expressApp: any) => {
  await mongooseLoader().catch((err: any) => {
    throw boilerError.DB_CONNECTION_ERROR;
  });
  await expressLoader({ app: expressApp });
};

export default init;
