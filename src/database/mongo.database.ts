import mongoose from 'mongoose';
import { MONGODB_URI } from '../util/config';
import { MongoError } from 'mongodb';

// Connect to database
const mongoDB = () =>
	mongoose
		.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		.then(() => console.log('🤟  MongoDB is connected! 🤟'))
		.catch((error: MongoError) =>
			console.log('😡 😡 😡  Crap! MongoDB connection error. ' + error)
		);

export default mongoDB;
