import passport from 'passport'
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'
import {Strategy as GoogleTokenStrategy} from 'passport-google-token'
import {handleLogin, cookieExtractor, fetchUser} from './helpers'
import config from '../config/config'


passport.use('google', new GoogleTokenStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret
},
    handleLogin
))
export const googleAuth = passport.authenticate('google', {session:false})



passport.use('jwt', new JwtStrategy({
    secretOrKey: config.security.secret_key,
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
}, 
    fetchUser
))
export const fromJwt = passport.authenticate('jwt', {session:false})
