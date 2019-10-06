import { Request, Response, NextFunction } from 'express';
import { Task, TaskDocument } from '../models/task.model';
import asyncWrapper from '../util/async-wrapper';
import Err from '../util/error.handler';

/**
 * Create new task.
 */
export const create = asyncWrapper(
	async (req: Request, res: Response): Promise<void> => {
		const task: TaskDocument = await Task.create(req.body);

		res.status(201).json({
			status: 'ok',
			data: { task }
		});
	}
);

/**
 * Find all tasks.
 */
export const findAll = asyncWrapper(
	async (req: Request, res: Response): Promise<void> => {
		const tasks: TaskDocument[] = await Task.find();

		res.status(200).json({
			status: 'ok',
			results: tasks.length,
			data: { tasks }
		});
	}
);

/**
 * Find one task by id.
 */
export const findOne = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const task: TaskDocument = await Task.findById(req.params.id);

		if (!task) {
			return next(new Err('No task found!', 404));
		}

		res.status(200).json({
			status: 'ok',
			data: { task }
		});
	}
);

/**
 * Update one task.
 */
export const updateOne = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const task: TaskDocument = await Task.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				runValidators: true,
				new: true
			}
		);

		if (!task) {
			return next(new Err('No task found!', 404));
		}

		res.status(200).json({
			status: 'ok',
			data: { task }
		});
	}
);

/**
 * Delete one task.
 */
export const deleteOne = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const task: TaskDocument = await Task.findByIdAndDelete(req.params.id);

		if (!task) {
			return next(new Err('No task found!', 404));
		}

		res.status(204).json({
			status: 'ok',
			data: null
		});
	}
);
