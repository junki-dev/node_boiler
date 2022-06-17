import express, { Request, Response } from 'express';
import { helper } from './common/logger';
import load from './config/loader';
import path from 'path';
import init from './loaders';

const logger = helper.getLogger(path.basename(__filename));

// config 설정
load();

const app = express();
init(app);

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException. ${error}`);
});
