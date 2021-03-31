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
    RenteeOwnsListing = "Rentee owns listing"
}

export type     AppointmentRequest = {

    meetupLocation: Location
    dropoffLocation: Location,
    date: Date,
    days: number,
    listingLicensePlate: string

}