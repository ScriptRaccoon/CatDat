import { dev } from '$app/environment'
import { REDIS_URL } from '$env/static/private'
import Redis from 'ioredis'

export const redis = new Redis(REDIS_URL, {
	tls: { rejectUnauthorized: !dev },
})
