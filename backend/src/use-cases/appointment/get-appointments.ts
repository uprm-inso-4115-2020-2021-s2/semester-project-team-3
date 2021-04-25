
import { IAppointment, IAppointmentRepository, ICarListingRepository, IClientRepository } from "../../domain";
import { ErrorMessages, GetAppointmentRequest, GetAppointmentResponse, UseCaseOutput } from "../declarations";

export function makeGetMyAppointments(carListingRepo: ICarListingRepository, appointmentRepo: IAppointmentRepository, clientRepo: IClientRepository) {

    function buildDtoFromArray(appointments:IAppointment[]){
        return appointments.map((val) => (
            {
                meetupLocation: val.location.meetupLocation,
                dropoffLocation: val.location.dropoffLocation,
                date: val.dateInformation.appointmentDate,
                days: val.dateInformation.days,
                rentee: val.rentee,
                listingLicensePlate: val.carListing.licensePlate
            }
        ))
    }

    return async function getMyAppointmentUseCase(data: GetAppointmentRequest): Promise<UseCaseOutput<GetAppointmentResponse[]>> {

        const owner = await clientRepo.findByEmail(data.owner)

        if (owner === null) {
            return {
                success: false,
                msg: ErrorMessages.ClientDoesNotExist
            }
        }

        const listing = await carListingRepo.findByLicensePlate(data.listingLicensePlate)

        if (listing === null) {
            return {
                success: false,
                msg: ErrorMessages.ListingDoesNotExist
            }
        }

        if (!owner.owns(listing)) {
            return {
                success: false,
                msg: ErrorMessages.ClientDoesNotOwnListing
            }
        }
        
        let query = {
            page: data.page
        }

        if (data.listingLicensePlate) {
            const appointments: IAppointment[] = await appointmentRepo.findAllByFields({
                ...query,
                licensePlate: data.listingLicensePlate,     
            })
            return {
                success: true,
                data: buildDtoFromArray(appointments)
            }
        }

        const appointments: IAppointment[] = await appointmentRepo.findAllByFields(query)
        return {
            success: true,
            data: buildDtoFromArray(appointments)
        }

    }

}