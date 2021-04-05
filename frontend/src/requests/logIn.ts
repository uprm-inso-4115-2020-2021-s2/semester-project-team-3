import axios from 'axios'


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
    console.log(result)
    return result

}