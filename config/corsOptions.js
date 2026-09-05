const allowedOrigins = [
    "https://mustafa-lakhsem.vercel.app",
    "https://www.mustafa-lakhsem.vercel.app",
    "https://mustafalakhsem.com",
    "https://www.mustafalakhsem.com",
    "http://localhost:3000"
];

exports.corsOption = {
    origin: (origin, callback) => {
        const isDevelopment = process.env.NODE_ENV !== "production";
        
        if (allowedOrigins.indexOf(origin) !== -1 || (isDevelopment && !origin)) {
            callback(null, true);
        } else {
            callback(new Error("Access Denied: Not allowed by CORS security policy"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};