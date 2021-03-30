import {IAppointment,IClient,AppointmentStatusType,ICarListing, ITransaction, Location} from "../declarations";

export class Appointment implements IAppointment {

    appointmentNumber: string | null;
    rentee: IClient;
    status: AppointmentStatusType;
    carListing: ICarListing;
    dateInformation: { appointmentDate: Date; days: number; };
    location: { meetupLocation: Location; dropoffLocation: Location; };
    postAcceptInformation: { dateAccepted: Date; transactions: ITransaction[]; } | null;

    constructor(data: Partial<IAppointment>){

        const errorMessages = []

        if (!data.dateInformation) {
            errorMessages.push("Missing date information")
        }

        if (!data.dateInformation?.appointmentDate) {
            errorMessages.push("Missing date information, appointmentDate")
        }

        if (!data.dateInformation?.days) {
            errorMessages.push("Missing date information, days")
        }
        else if (data.dateInformation.days! <= 0) {
            errorMessages.push("Days has to be a number greater than 0")
        }

        if (!data.location) {
            errorMessages.push("Missing location")
        }

        if (!data.location?.dropoffLocation) {
            errorMessages.push("Missing location, dropoffLocation")
        }

        if (!data.location?.meetupLocation) {
            errorMessages.push("Missing location, meetupLocation")
        }

        if (!data.carListing) {
            errorMessages.push("Missing carListing")
        }

        if (!data.rentee) {
            errorMessages.push("Missing rentee data")
        }

        if (data.status === AppointmentStatusType.Accepted && !data.postAcceptInformation ) {
            errorMessages.push("If an appointmnet is accepted it has to have postAcceptInformation")
        }

        if (errorMessages.length > 0) {
            throw new Error(errorMessages.join(" and "))
        }

        this.appointmentNumber = data.appointmentNumber ? data.appointmentNumber : null
        this.rentee = data.rentee!
        this.status = data.status ? data.status: AppointmentStatusType.Pending
        this.carListing = data.carListing!
        this.dateInformation = data.dateInformation!
        this.dateInformation.appointmentDate = new Date(data.dateInformation!.appointmentDate)
        this.location = data.location! 
        this.postAcceptInformation = data.postAcceptInformation? data.postAcceptInformation : null

    }
    

}