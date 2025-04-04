// import redis from '../../../lib/redis';

export async function GET() {
  try {
    // const headers = new Headers();
    // headers.set('Cache-Control', 'no-store, max-age=0');
    // const connectionInfo = {
    //   host: redis.options.host,
    //   port: redis.options.port,
    //   db: redis.options.db,
    //    status: redis.status, // This is a property, not a function
    //   connected: redis.status === 'ready'
    // };
    // await redis.set('dummy', 'okay theek hai');
    // const value = await redis.get('dummy');
    return Response.json({
      message: "Testing",
      // connection: connectionInfo,
      // serverTime: new Date().toISOString()
    });
  } catch (err) {
    // console.error('Redis error:', err);
    return new Response('Error connecting to Redis', { status: 500 });
  }
}
