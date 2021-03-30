
import { IAppointment, IAppointmentRepository, AppointmentStatusType } from "../../domain";
import { CarListingModel } from "../models";
import { AppointmentModel } from "../models/appointmentmodel";


export default class AppointmentRepository implements IAppointmentRepository {
    

    private calcEndDate(date:Date, days:number) {
        let endDate = new Date(date)
        endDate.setDate(endDate.getDate() + days)
        return endDate
    }

    async createAppointment(appointment: IAppointment): Promise<IAppointment | null> {
        throw new Error("Method not implemented.");
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
                $match: {
                    startDate: {$lt: myEndDate},
                    endDate: {$gt: date},
                    status: AppointmentStatusType.Accepted,
                    carListing: listing!._id
                }
            }
        ]).limit(2).exec()

        console.log(date, myEndDate)
        console.log(appointments)

        return appointments.length > 0;
    }

}