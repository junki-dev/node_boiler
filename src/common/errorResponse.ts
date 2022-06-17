import { Response } from 'express';
import path from 'path';
import { helper } from './logger';

const logger = helper.getLogger(path.basename(__filename));

const errorResponse = (res: Response, message: string, statusCode: number, error: any) => {
  logger.error(JSON.stringify({ error: error }));

  res.status(statusCode).json({
    error: message,
  });
};

export { errorResponse };
