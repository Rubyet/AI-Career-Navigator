import { createClient } from 'redis';
import logger from './logger';

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redis.on('error', (err) => logger.error('Redis Client Error', err));
redis.on('connect', () => logger.info('Redis Client Connected'));

export const initializeRedis = async () => {
  await redis.connect();
};

export const getRedis = () => redis;

export default redis;
