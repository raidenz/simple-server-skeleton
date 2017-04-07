import express from 'express';
import controller from './controller';

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
  .post(controller.create);

router.route('/:id')
  .get(controller.getId)
  .patch(controller.update)
  .delete(controller.delete);

export default router;
