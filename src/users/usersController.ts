import { Request, Response } from 'express';
import Joi from 'joi';
import { boilerError } from '../common/boilerMessage';
import { errorResponse } from '../common/errorResponse';
import { TUserBody, TUserParams, TUserQuery } from './types';

const getUsers = (req: Request, res: Response, next: any) => {
  /* 	#swagger.tags = ['Users']
        #swagger.description = '사용자 정보 조회' */

  /*	#swagger.parameters['userId'] = {
            in: 'query',
            description: '사용자 아이디',
            required: true,
    } */
  try {
    const { userId } = req.query as TUserQuery;

    // validation check
    Joi.assert(userId, Joi.string().required());

    res.status(200).json(`[GET] /users, userId: ${userId}`);
  } catch (err: any) {
    if (err.name === `ValidationError`) {
      /* #swagger.responses[400] = { 
        description: "Invalid parameter" } */
      errorResponse(res, boilerError.INVALID_PARAMETER, 400, err.message);
    } else {
      /* #swagger.responses[500] = { 
        description: "Unkown error" } */
      errorResponse(res, boilerError.UNKOWN_ERROR, 500, err);
    }
  }
};

const getUserWithUserId = (req: Request, res: Response) => {
  try {
    const { userId } = req.params as TUserParams;

    // validation check
    Joi.assert(userId, Joi.string().required());

    res.status(200).send(`[GET] /users/userid, userId: ${userId}`);
  } catch (err: any) {
    if (err.name === `ValidationError`) {
      /* #swagger.responses[400] = { 
        description: "Invalid parameter" } */
      errorResponse(res, boilerError.INVALID_PARAMETER, 400, err.message);
    } else {
      /* #swagger.responses[500] = { 
        description: "Unkown error" } */
      errorResponse(res, boilerError.UNKOWN_ERROR, 500, err);
    }
  }
};

const setUserName = (req: Request, res: Response) => {
  try {
    const { name } = req.body as TUserBody;

    // validation check
    Joi.assert(name, Joi.string().required());

    res.status(200).send(`[POST] /users, name: ${name}`);
  } catch (err: any) {
    if (err.name === `ValidationError`) {
      /* #swagger.responses[400] = { 
        description: "Invalid parameter" } */
      errorResponse(res, boilerError.INVALID_PARAMETER, 400, err.message);
    } else {
      /* #swagger.responses[500] = { 
        description: "Unkown error" } */
      errorResponse(res, boilerError.UNKOWN_ERROR, 500, err);
    }
  }
};

export default { getUsers, getUserWithUserId, setUserName };
