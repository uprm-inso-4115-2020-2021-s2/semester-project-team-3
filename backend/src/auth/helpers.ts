import {clientLoginUseCase} from '../use-cases'
import { Profile } from 'passport'
import { Request } from 'express'
import {ClientRepository} from '../persistence'

interface VerifyOptions {
    message: string;
}

interface VerifyFunction {
    (error: any, user?: any, msg?: VerifyOptions): void;
}

interface DeserializedJwtToken {
    sub: string
}

export const handleLogin = async (accessToken:string, refreshToken:string, profile:Profile, done:VerifyFunction) => {
    const result = await clientLoginUseCase({
        email: profile.emails?profile.emails[0].value : "",
        name: profile.displayName,
        image: profile.photos? profile.photos[0].value : ""
    }) 

    if ( result.success ) {
        done(null, result.data?.toDto())
        return
    }
    
    done(!result.success, null)
}

export const cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['auth'];
    }
    return token;
};

export const fetchUser = async (payload:DeserializedJwtToken, done: VerifyFunction) => {
    const clientRepo = new ClientRepository()
    const fetched = await clientRepo.findByEmail(payload.sub)
    
    
    if (!fetched) {
        done(true, null)
        return
    }


    done(null, fetched!.toDto())
}