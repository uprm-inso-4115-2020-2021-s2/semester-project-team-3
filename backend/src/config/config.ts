import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SECRET_KEY = process.env.SECRET_KEY || 'foo'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    secret_key: SECRET_KEY
};

const GOOGLE = {
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
}

const config = {
    server: SERVER,
    google: GOOGLE
};

export default config;
