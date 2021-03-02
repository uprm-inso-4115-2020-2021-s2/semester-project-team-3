import passport from 'passport'
import GoogleTokenStrategy from 'passport-google-plus-token'
import {handleLogin} from './helpers'
import config from '../config/config'


passport.use('google', new GoogleTokenStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret
},
    handleLogin
))


