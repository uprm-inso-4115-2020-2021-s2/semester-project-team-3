
import config from '../../config/config'
import jwt from 'jsonwebtoken'

type JWTToken = string

export function clientSerialize(email: string): JWTToken  {
    
    return jwt.sign({sub: email}, config.security.secret_key, {
        expiresIn: config.security.token_expiration,
    })

}