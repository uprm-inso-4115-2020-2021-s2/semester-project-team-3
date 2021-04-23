import axios from 'axios'
import { IUser } from '../hooks/useUser'

export type CreateListingRequest = {
    title: string,
    carLocationLat: number,
    carLocationLon: number,
    carLocationAddress: string,
    owner: string,
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

    const result = await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/listing?access_token=${listingInfo.accessToken}`, {
            ...listingInfo
        })

    console.log(result)
    return result.data

}