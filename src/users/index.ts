import express from 'express';
import usersController from './usersController';

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:userId', usersController.getUserWithUserId);
router.post('/', usersController.setUserName);

export default router;
