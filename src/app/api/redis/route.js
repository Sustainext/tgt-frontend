import redis from '../../../lib/redis';

export async function GET() {
  try {
    await redis.set('message', 'Hello from Redis!');
    const value = await redis.get('message');

    return Response.json({ message: value });
  } catch (err) {
    console.error('Redis error:', err);
    return new Response('Error connecting to Redis', { status: 500 });
  }
}
