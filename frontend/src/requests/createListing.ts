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
    carImages?: File[],
    carLicenseImage?: File[],
    cancellationFee: number,
    canDeliver?: boolean,
    accessToken: string
}

export default async function createListing(listingInfo: CreateListingRequest) {


        return axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/listing?access_token=${listingInfo.accessToken}`, 
            listingInfo
        ).then(res => res.data)
        .catch(err => {
            return err.response?.data
        })
    

}