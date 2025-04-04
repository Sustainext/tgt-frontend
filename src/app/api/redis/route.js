import redis from '../../../lib/redis';

export async function GET() {
  try {
     const connectionInfo = {
      host: redis.options.host,
      port: redis.options.port,
      db: redis.options.db,
       status: redis.status, // This is a property, not a function
      connected: redis.status === 'ready'
    };
    await redis.set('message', 'Hello from Redis!');
    const value = await redis.get('message');

   return Response.json({
      message: value,
      connection: connectionInfo,
      serverTime: new Date().toISOString()
    });
  } catch (err) {
    console.error('Redis error:', err);
    return new Response('Error connecting to Redis', { status: 500 });
  }
}
