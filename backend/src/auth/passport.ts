import passport, { Profile } from 'passport'
import GoogleTokenStrategy from 'passport-google-plus-token'
import config from '../config/config'

interface VerifyOptions {
    message: string;
}

interface VerifyFunction {
    (error: any, user?: any, msg?: VerifyOptions): void;
}

passport.use('google', new GoogleTokenStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret
},
    (accessToken:string, refreshToken:string, profile:Profile, done:VerifyFunction) => {
        done(null, profile)
    }
))


