import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 30,
  duration: 60,
  blockDuration: 60 * 10,
});

export async function rateLimit(ip: string) {
  try {
    await rateLimiter.consume(ip);
    return { allowed: true };
  } catch (err) {
    const rateLimiterRes = err as RateLimiterRes;
    const retrySecs = Math.round(rateLimiterRes.msBeforeNext / 1000) || 1;
    return { allowed: false, retryAfter: retrySecs };
  }
}
