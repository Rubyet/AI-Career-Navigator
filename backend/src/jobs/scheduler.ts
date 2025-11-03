import cron from 'node-cron';
import axios from 'axios';
import logger from '../config/logger';

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8000';

export const startCronJobs = () => {
  // Daily job aggregation at 2 AM
  cron.schedule('0 2 * * *', async () => {
    logger.info('Starting daily job aggregation');
    try {
      await axios.post(`${AI_ENGINE_URL}/api/aggregate-jobs`);
      logger.info('Job aggregation completed');
    } catch (error) {
      logger.error('Job aggregation failed:', error);
    }
  });

  // Check application deadlines every hour
  cron.schedule('0 * * * *', async () => {
    logger.info('Checking application deadlines');
    // TODO: Implement deadline notification logic
  });

  logger.info('Cron jobs scheduled');
};
