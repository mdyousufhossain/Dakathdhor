import rateLimit from 'express-rate-limit';


export const apiRateLimiter = rateLimit({
  windowMs: 1 * 1000, // 1 second
  max: 10,
  message: 'Too many requests from this IP, please try again after a second.',
});


