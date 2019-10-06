require('dotenv').config();
import app from './app';
import mongoDB from './database/mongo.database';

/**
 * Launch MongoDB.
 */
mongoDB();

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
	console.log(
		'  App is running at http://localhost:%d in %s mode',
		app.get('port'),
		app.get('env')
	);
	console.log('  Press CTRL-C to stop it\n');
});

export default server;
