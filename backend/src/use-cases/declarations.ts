import { Location } from "../domain";

export interface UseCaseOutput<E> {
    success: boolean,
    msg?: string,
    data?: E 
}


export enum ErrorMessages {
    CreationError = "Error ocurred while persisting object",
    AlreadyExists = "Entity already exists",
    OverlapsError = "Appointment overlaps with an existant accepted appointment",
    ClientDoesNotExist = "User does not exist",
    ListingDoesNotExist = "Listing Does Not Exist",
    RenteeOwnsListing = "Rentee owns listing",
    ClientDoesNotOwnListing = "Client does not own this listing",
    ListingImageCapacityReached = "Listing image capacity reached"
}

/**
"model": "Corolla",
"brand": "Toyota",
"year": 2020,
"cancellationFee":25.56,
"licensePlate": "TES321",
"priceRate": 35,
"carDescription": " Testing creating a vehicle ",
"carImages": [""] ,
"carLocation": {lat:0, lon:0, address:""}
 */
export type CreateCarListingRequest = {
    title: string,
    carLocationLat: number,
    carLocationLon: number,
    carLocationAddress: string,
    owner: string,
    model: string,
    brand: string,
    year:number,
    licensePlate: string,
    priceRate: number,
    carDescription: string
    carImages?: File[],
    carLicenseImage?: File[],
    cancellationFee: number,
    canDeliver?: boolean

}

export type AppointmentRequest = {

    meetupLocation: Location
    dropoffLocation: Location,
    date: Date,
    days: number,
    listingLicensePlate: string

}

export type File = {
    path:string,
    filename: string
}

export interface IStorageAdapter {
    upload(f:File): Promise<string | null>
    uploadFileArray(fs: File[]): Promise<string[] | null>
    remove(f:File): Promise<void>
    removeFileArray(f:File[]): Promise<void>
}