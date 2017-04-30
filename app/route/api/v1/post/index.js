import express from 'express';
import controller from './controller';
import authdo from 'config/auth.js';

const auth = authdo();
/**
 * TODO:
 * Placing auth.authenticate() middleware
 */

let router = express.Router();

router.route('/')
  .get(controller.list)
  .post(auth.authenticate(), controller.create);

router.route('/:id')
  .get(controller.getId)
  // .patch(auth.authenticate(), controller.update)
  .delete(auth.authenticate(), controller.delete);
  // .delete(controller.delete);

router.route('/tag/:slug')
  .get(controller.getTagBySlug);

router.route('/category/:id')
  .get(controller.getCatbyId);

export default router;
