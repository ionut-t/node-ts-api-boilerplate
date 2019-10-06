import fs from 'fs';
import dotenv from 'dotenv';
import logger from './logger';

if (fs.existsSync('.env')) {
	logger.debug('Using .env file to supply config environment variables');
	dotenv.config({ path: '.env' });
} else {
	logger.debug('The file does not exist');
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production';

export const MONGODB_URI = prod
	? process.env.MONGODB_URI_PROD
	: process.env.MONGODB_URI_DEV;

if (!MONGODB_URI) {
	if (prod) {
		logger.error(
			'No mongo connection string. Set MONGODB_URI_PROD environment variable.'
		);
	} else {
		logger.error(
			'No mongo connection string. Set MONGODB_URI_DEV environment variable.'
		);
	}
	process.exit(1);
}
