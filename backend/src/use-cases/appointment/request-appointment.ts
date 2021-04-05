import { IAppointment, IAppointmentRepository, ICarListingRepository, IClient, IClientRepository, makeClient } from "../../domain";
import { AppointmentRequest, ErrorMessages, UseCaseOutput } from "../declarations";


export function makeRequestAppointment(appointmentRepo: IAppointmentRepository, clientRepo: IClientRepository, carLisitingRepo: ICarListingRepository) {

    return async (renteeEmail: string, requestFields: AppointmentRequest): Promise<UseCaseOutput<IAppointment>> => {

        const listing = await carLisitingRepo.findByLicensePlate(requestFields.listingLicensePlate)
        if (!listing) {
            return {
                success: false,
                msg: ErrorMessages.ListingDoesNotExist
            }
        }

        const rentee = await clientRepo.findByEmail(renteeEmail)
        if (!rentee) {
            return {
                success: false,
                msg: ErrorMessages.ClientDoesNotExist
            }
        }    

        if ( await appointmentRepo.overlapExists(requestFields.date, requestFields.days, requestFields.listingLicensePlate) ) {
            return {
                success: false,
                msg: ErrorMessages.OverlapsError
            }
        }


        if (rentee.owns(listing)){
            return {
                success: false,
                msg: ErrorMessages.RenteeOwnsListing
            }
        }


        let appointment
        try {
            appointment = rentee.request({
                listing: listing,
                meetupLocation: requestFields.meetupLocation,
                dropoffLocation: requestFields.dropoffLocation,
                date: requestFields.date,
                days: requestFields.days
            })
        } catch (err) {
            return {
                success: false,
                msg: (err as Error).message
            }
        }

        const persisted = await appointmentRepo.createAppointment(appointment)

        if (persisted) {
            return {
                success: true,
                data: persisted
            }
        }

        return {
            success: false,
            msg: ErrorMessages.CreationError
        }

    }

}