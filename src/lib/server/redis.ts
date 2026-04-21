import { dev } from '$app/environment'
import { REDIS_URL } from '$env/static/private'
import Redis from 'ioredis'

if (!REDIS_URL) throw new Error('Redis URL is missing')

export const redis = new Redis(REDIS_URL, {
	tls: dev ? undefined : { rejectUnauthorized: true },
	retryStrategy: (times) => (times >= 5 ? null : 1000),
})

redis.on('connect', () => {
	console.info('Redis connected')
})

redis.on('error', (err) => {
	console.error('Redis error:', err)
})
