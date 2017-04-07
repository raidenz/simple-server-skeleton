import express from 'express';
import controller from './controller';

let router = express.Router();

router.route('/')
  .get(controller.list)
  .post(controller.create);

// router.route('/:id')
//   .get(controller.getId)
//   .patch(controller.update)
//   .delete(controller.delete);

// router.route('/tag/:slug')
//   .get(controller.getTagBySlug);

// router.route('/category/:id')
//   .get(controller.getCatbyId);

export default router;
