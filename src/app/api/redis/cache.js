import redis from '../../../lib/redis';

export default async function handler(req, res) {
    try{
        await redis.set('message', 'Hello from Redis!');
  const value = await redis.get('message');

  res.status(200).json({ message: value });
    }
    catch(err){
        console.log(err)
    }
  
}
