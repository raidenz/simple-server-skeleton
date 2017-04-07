import express from 'express';
import controller from './controller';

let router = express.Router();

router.route('/')
  .get(controller.list)
  .post(controller.create);

router.route('/:id')
  .get(controller.getId)
  .patch(controller.update)
  .delete(controller.delete);

export default router;
