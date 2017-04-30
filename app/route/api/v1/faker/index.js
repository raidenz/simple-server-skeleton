import express from 'express';
import controller from './controller';
import authdo from 'config/auth.js';

// const auth = authdo();
let router = express.Router();

router.route('/post/:num')
  // .post(auth.authenticate(), controller.fakePost);
  .get(controller.fakerPost);

router.route('/user/:num')
  .get(controller.fakerUser);

router.route('/category/:num')
  .get(controller.fakerCategory);

router.route('/tag/:num')
  .get(controller.fakerTag);

export default router;
