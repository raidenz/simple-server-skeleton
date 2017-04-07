import express from 'express';
var router = express.Router();
import Router from './index';

router.use('/user', Router.User);
router.use('/post', Router.Post);
router.use('/category', Router.Category);

export default router;
