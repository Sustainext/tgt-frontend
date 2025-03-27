import Redis from 'ioredis';

// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: Number(process.env.REDIS_PORT),
//   password: process.env.REDIS_PASSWORD,
//   tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
// });

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  // password: 'YOUR_REDIS_PASSWORD', // Only if you set one
  // Optional: add TLS if you're securing Redis
  // tls: {}
});

export default redis;
