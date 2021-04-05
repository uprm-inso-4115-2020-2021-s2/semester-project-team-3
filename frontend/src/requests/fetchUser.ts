import axios from 'axios'
import { IUser } from '../hooks/useUser'

export type FetchUserRequest = {
    access_token: string,
}

export default async function fetchUser(requestInfo: FetchUserRequest) {

    const result = await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/user?access_token=${requestInfo.access_token}`,)

    console.log(result)
    return result.data as IUser

}