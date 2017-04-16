import express from 'express';
import controller from './controller';
import authdo from 'config/auth.js';

const auth = authdo();
let router = express.Router();

router.route('/')
  .get(controller.list)
  .post(auth.authenticate(), controller.create);

router.route('/:id')
  .get(controller.getId)
  .patch(auth.authenticate(), controller.update)
  .delete(auth.authenticate(), controller.delete);

export default router;
