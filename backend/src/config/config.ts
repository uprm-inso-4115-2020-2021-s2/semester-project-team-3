import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '1337';
const SECRET_KEY = process.env.SECRET_KEY || 'foo'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "3h"
const COOKIE_DURATION = Number(process.env.COOKIE_DURATION) || 8.64e+7
const GOOGLE_STORAGE_SERVICE_KEY = process.env.GOOGLE_STORAGE_SERVICE_KEY || ''
const GOOGLE_STORAGE_BUCKET = process.env.GOOGLE_STORAGE_BUCKET || ''
const GOOGLE_PROJECT_ID = process.env.projectId || ''

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: Number(SERVER_PORT),
    
};

const SECURITY = {
    secret_key: SECRET_KEY,
    token_expiration: TOKEN_EXPIRATION,
    cookie_duration : COOKIE_DURATION,
    cors: {
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials:true
    }
}

const GOOGLE = {
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    storageServiceKey: GOOGLE_STORAGE_SERVICE_KEY,
    storageBucket: GOOGLE_STORAGE_BUCKET,
    projectId: GOOGLE_PROJECT_ID
}

const config = {
    server: SERVER,
    google: GOOGLE,
    security: SECURITY
};

export default config;
