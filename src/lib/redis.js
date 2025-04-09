// // lib/redis.js
// import Redis from 'ioredis';

// const redisConfig = {
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   db:0,
//   retryStrategy: (times) => {
//     const delay = Math.min(times * 50, 2000);
//     return delay;
//   },
//   maxRetriesPerRequest: 3,
// };

// const redis = new Redis(redisConfig);

// // Handle connection events
// redis.on('connect', () => {
//   console.log('Connected to Redis');
// });

// redis.on('error', (err) => {
//   console.error('Redis error:', err);
// });

// export default redis;