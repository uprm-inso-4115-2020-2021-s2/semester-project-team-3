import {clientLoginUseCase} from '../use-cases'
import { Profile } from 'passport'

interface VerifyOptions {
    message: string;
}

interface VerifyFunction {
    (error: any, user?: any, msg?: VerifyOptions): void;
}


export const handleLogin = async (accessToken:string, refreshToken:string, profile:Profile, done:VerifyFunction) => {
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