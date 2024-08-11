"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigins = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5050',
    'http://localhost:5050',
    'http://localhost:9000'
];
const credentials = (req, res, next) => {
    const origin = req.headers.origin; // Type assertion
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
};
exports.corsOptions = {
    origin: (origin, callback) => {
        if (origin && allowedOrigins.includes(origin) || !origin) {
            callback(null, true); // Allow the request
        }
        else {
            callback(new Error('Not allowed by CORS'), false); // Deny the request
        }
    },
    optionsSuccessStatus: 200
};
exports.default = credentials;
