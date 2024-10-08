import { CorsOptions } from 'cors';
import { Request, Response, NextFunction } from 'express';
 

// this is will be added into admin section 
const allowedOrigins = [
    'https://www.yoursite.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:9000'
];

const credentials = (req: Request, res: Response, next: NextFunction): void => {
    const origin = req.headers.origin as string | undefined; // Type assertion

    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }

    next();
};



export const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, success: boolean) => void) => {
        if (origin && allowedOrigins.includes(origin) || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS'), false); // Deny the request
        }
    },
    optionsSuccessStatus: 200
};




export default credentials;
