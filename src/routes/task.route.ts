import express, { Router } from 'express';
import {
	create,
	findAll,
	findOne,
	updateOne,
	deleteOne
} from '../controllers/task.controller';

const router: Router = express.Router();

router.post('/', create);

router
	.route('/')
	.post(create)
	.get(findAll);

router
	.route('/:id')
	.get(findOne)
	.put(updateOne)
	.delete(deleteOne);

export default router;
