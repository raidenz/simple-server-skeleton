import express from 'express';
import controller from './controller';
import authdo from 'config/auth';

const auth = authdo();
let router = express.Router();

/**
 * Try to simplify
 */
/**
 *  router.route('/')
 *    .get(controller.list)
 *    .post(controller.create);
 *  router.route('/:id')
 *    .get(controller.find)
 *    .patch(controller.update)
 *    .delete(controller.destroy);
 *
 *  PUT -> input(type='hidden', name='_method', value='PUT') like laravel concept
 *  X-HTTP-Method-Override: PUT
 *  fetch method: PUT
 */

router.route('/')
  .get(controller.list)
  .post(auth.authenticate(), controller.create);

router.route('/:id')
  .get(controller.getId)
  .patch(auth.authenticate(),controller.update)
  .delete(auth.authenticate(), controller.delete);

export default router;
