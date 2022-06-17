import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import swaggerFile from '../swagger/swagger-output.json';
import users from '../users';
import { helper } from '../common/logger';

const expressLoader = async ({ app }: { app: express.Application }) => {
  const port = process.env.PORT;
  const logger = helper.getLogger(path.basename(__filename));

  const requestLogger = (req: Request, res: Response, next: any) => {
    let reqBody;

    if (req.method === 'POST') {
      reqBody = req.body;
    } else if (req.method === 'GET') {
      reqBody = req.query || req.params;
    }

    logger.debug(`method: ${req.method}, path: ${req.url}, body: ${JSON.stringify(reqBody)}`);
    next();
  };

  // 미들웨어 //
  app.use(requestLogger);

  // - 미들웨어 //

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // router //
  app.use('/users', users);

  // swagger docs
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));

  // - router //

  app.listen(port, () => {
    logger.info(`🛡️ Server listening on port: ${port}`);
  });

  return app;
};

export default expressLoader;
