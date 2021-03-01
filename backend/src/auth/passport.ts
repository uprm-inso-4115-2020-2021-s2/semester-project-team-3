import passport, { Profile } from 'passport'
import GoogleTokenStrategy from 'passport-google-plus-token'
import {clientLoginUseCase} from '../use-cases'
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
    async (accessToken:string, refreshToken:string, profile:Profile, done:VerifyFunction) => {
        const result = await clientLoginUseCase({
            email: profile.emails?profile.emails[0].value : "",
            name: profile.displayName,
            image: profile.photos? profile.photos[0].value : ""
        }) 

        if ( result.success ) {
            done(null, result.data)
            return
        }
        
        done(!result.success, null)
    }
))


