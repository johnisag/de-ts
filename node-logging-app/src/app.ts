import logger from './logger';

// Example function to demonstrate logging
logger.info('Task started');
logger.warn('This is a warning message');
logger.error('An error occurred during the task');
logger.info('Task completed successfully');

setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    logger.info(`Memory Usage: RSS=${
        (memoryUsage.rss / 1024 / 1024).toFixed(2)} MB, Heap Total=${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB, Heap Used=${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    logger.info(`CPU Usage: User=${(cpuUsage.user / 1000).toFixed(2)} ms, System=${(cpuUsage.system / 1000).toFixed(2)} ms`);
    
}, 5000);