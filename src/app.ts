import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import taskRouter from './routes/task.route';
import Err from './util/error.handler';
import errorController from './controllers/error.controller';

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Express configuration.
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(compression());
app.use(cors());

app.use('/api/v1/tasks', taskRouter);
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
	next(new Err(`Can't find ${req.originalUrl}!`, 404));
});

app.use(errorController);

export default app;
