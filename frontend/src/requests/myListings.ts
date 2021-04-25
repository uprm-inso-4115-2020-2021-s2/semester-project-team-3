import axios from 'axios'


export default async function fetchMyListings(access_token:string) {

    return axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/listing?access_token=${access_token}`)
    .then(res => res.data)
    .catch(err => {
        if (!err.response) {
            alert(err.message)
            return {success:false, data:[]}
        }
        return err.response?.data
    })

}