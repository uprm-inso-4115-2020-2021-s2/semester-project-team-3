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

export type     AppointmentRequest = {

    meetupLocation: Location
    dropoffLocation: Location,
    date: Date,
    days: number,
    listingLicensePlate: string

}

export type File = {
    key: string // Available using `S3`.
    path: string // Available using `DiskStorage`.
    mimetype: string
    originalname: string
    size: number
}