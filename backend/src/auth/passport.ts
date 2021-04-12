import passport from 'passport'
import {Strategy as GoogleTokenStrategy} from 'passport-google-token'
import { VerifyFunction} from './helpers'
import config from '../config/config'
import { clientLoginUseCase } from '../use-cases'


passport.use('google', new GoogleTokenStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret
}, async (accessToken:string, refreshToken:string, profile:any, done:VerifyFunction) => {

    const result = await clientLoginUseCase({
        email: profile.emails?profile.emails[0].value : "",
        name: profile.displayName,
        image: profile._json.picture
    }) 

    if ( result.success ) {
        done(null, result.data?.toDto())
        return
    }
    
    done(!result.success, null)
}))
export const googleAuth = passport.authenticate('google', {session:false})
