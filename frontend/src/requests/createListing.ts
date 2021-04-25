import axios from 'axios'
import { IUser } from '../hooks/useUser'

export type CreateListingRequest = {
    title: string,
    carLocationLat: number,
    carLocationLon: number,
    carLocationAddress: string,
    model: string,
    brand: string,
    year: number,
    licensePlate: string,
    priceRate: number,
    carDescription: string
    carImages?: FileList,
    carLicenseImage?: File[],
    cancellationFee: number,
    canDeliver?: boolean,
    accessToken: string
}

export default async function createListing(listingInfo: CreateListingRequest) {

        let {accessToken , ...rest} = listingInfo

        let body = new FormData();
        
        for ( let key in rest ) {
            
            if (key === "carImages" && rest[key]) {
                for(let i = 0; i < rest[key].length; i++) {
                    body.append("carImages", rest[key].item(i))
                }
            } else {
                body.append(key, rest[key])
            }
            
        }

        console.log(body.getAll('carImages'))
        return axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/listing?access_token=${accessToken}`, 
            body
        ).then(res => res.data)
        .catch(err => {
            if (!err.response) {
                alert(err.message)
            }
            return err.response?.data
        })
    

}