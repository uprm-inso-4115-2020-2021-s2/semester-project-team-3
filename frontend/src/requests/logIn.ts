import axios from 'axios'
import { IUser } from '../hooks/useUser'

export type OauthLoginRequest = {
    access_token: string,
    provider:string
}

export default async function logIn(requestInfo: OauthLoginRequest) {

    const result = await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/oauth2/${requestInfo.provider}`, 
    {
        access_token:requestInfo.access_token
    })
    
    return result.data as IUser

}