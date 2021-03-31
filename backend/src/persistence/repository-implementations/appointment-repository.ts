
import { IAppointment, IAppointmentRepository, AppointmentStatusType } from "../../domain";
import { CarListingModel, ClientModel } from "../models";
import { AppointmentModel } from "../models/appointmentmodel";


export default class AppointmentRepository implements IAppointmentRepository {
    

    private calcEndDate(date:Date, days:number) {
        let endDate = new Date(date)
        endDate.setDate(endDate.getDate() + days)
        return endDate
    }

    async createAppointment(appointment: IAppointment): Promise<IAppointment | null> {
        let rentee = await ClientModel
            .findOne({email: appointment.rentee.email}, '_id')
            .lean()
            .exec()

        let listing = await CarListingModel
            .findOne({licensePlate: appointment.carListing.licensePlate}, '_id')
            .lean()
            .exec()

        if (!listing || !rentee) return null;

        const appointmentDataModel = new AppointmentModel({
            rentee: rentee?._id,
            carListing: listing?._id,
            status: appointment.status,
            dateInformation: appointment.dateInformation,
            location: {
                meetupLocation:{
                    type: "Point",
                    coordinates: [appointment.location.meetupLocation.lat, appointment.location.meetupLocation.lon],
                    address: appointment.location.meetupLocation.address                
                },
                dropoffLocation: {
                    type: "Point",
                    coordinates: [appointment.location.dropoffLocation.lat, appointment.location.dropoffLocation.lon],
                    address: appointment.location.dropoffLocation.address  
                }
            }
        })

        await appointmentDataModel.save()

        appointment.appointmentNumber = appointmentDataModel._id

        return appointment
    }

    async overlapExists(date: Date, days: number, listingPlate: string): Promise<boolean> {
        let myEndDate = this.calcEndDate(date, days)

        const listing = await CarListingModel.findOne({licensePlate: listingPlate}).lean().exec()

        const appointments = await AppointmentModel.aggregate([
            { $project: {
                _id: 0,
                status: 1,
                carListing: 1,
                startDate: "$dateInformation.appointmentDate",
                endDate: { $add:["$dateInformation.appointmentDate", {$multiply:[`$dateInformation.days`, 24*60*60000]}] }
            }}, 
            {
                $match:  {
                    startDate: {$lt: myEndDate},
                    endDate: {$gt: date},
                    status: AppointmentStatusType.Accepted,
                    carListing: listing!._id
                }
            }
        ]).limit(2).exec()

        return appointments.length > 0;
    }

}