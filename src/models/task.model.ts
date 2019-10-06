import mongoose from 'mongoose';

enum Status {
	Incompleted = 'incompleted',
	Completed = 'completed'
}

export type TaskDocument = mongoose.Document & {
	content: string;
	status?: Status.Incompleted | Status.Completed;
};

const TaskSchema = new mongoose.Schema({
	content: {
		type: String,
		required: [true, 'The content cannot be empty']
	},
	status: {
		type: String,
		enum: ['incompleted', 'completed'],
		default: 'incompleted'
	}
});

export const Task = mongoose.model<TaskDocument>('Task', TaskSchema);
