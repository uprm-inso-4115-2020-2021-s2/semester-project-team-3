import { AppointmentQueryFields, AppointmentUpdateFields } from "../../domain/repositories";
import { IAppointment, IAppointmentRepository, AppointmentStatusType, makeAppointment, makeClient, makeCarListing } from "../../domain";
import { CarListingModel, ClientModel, ICarListingModel, IClientModel } from "../models";
import { AppointmentModel, IAppointmentModel } from "../models/appointmentmodel";
import  CarListingRepository  from "./carlisting-repository";

const carListingRepo = new CarListingRepository()

export default class AppointmentRepository implements IAppointmentRepository {
    
    
    async findAllByFields(data: AppointmentQueryFields): Promise<IAppointment[]> {
        let query = AppointmentModel.find()
        
        if (data.rentee) {
            query = query.find({
                retnee: (await ClientModel.findOne({email:data.rentee}).exec())!._id!
            })
        }
        
        if (data.licensePlate) {
            query = query.find({
                carListing: (await CarListingModel.findOne({licensePlate: data.licensePlate}).exec())!._id!
            })
        }

        const result = await query.limit(10).skip(10*(data.page - 1)).exec()
        const prebuilt = result.map(async (val) => (await this.buildAppointment(val)) as IAppointment)
        const finalResult = await Promise.all(prebuilt)
        return finalResult
    }
    

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

    private async buildAppointment(appointment: IAppointmentModel): Promise<IAppointment | null> {
        if (appointment == null) {
            return null
        }
        await appointment.populate("rentee").populate("carListing").execPopulate()
        try{
            const builtAppointment = makeAppointment({
                appointmentNumber: appointment._id,
                rentee: makeClient(appointment.rentee as IClientModel),
                status: appointment.status,
                carListing: (await carListingRepo.findByLicensePlate((appointment.carListing as ICarListingModel).licensePlate))!,
                dateInformation: {
                    appointmentDate: appointment.dateInformation.appointmentDate,
                    days: appointment.dateInformation.days
                },
                location: {
                    meetupLocation: {lat: appointment.location.meetupLocation.coordinates[1],
                                    lon: appointment.location.meetupLocation.coordinates[0], 
                                    address: appointment.location.meetupLocation.address},
                    dropoffLocation: {lat: appointment.location.dropoffLocation.coordinates[1],
                        lon: appointment.location.dropoffLocation.coordinates[0], 
                        address: appointment.location.dropoffLocation.address}
                },
                postAcceptInformation: {
                    dateAccepted: appointment.postAcceptInformation?.dateAccepted, 
                    transactions: []
                } 
            })
            return builtAppointment
        }
        catch(err) {
            return null
        }

    }

    async findAppointmentByNumber(appointmentNumber: string): Promise<IAppointment | null> {
        const appointment = await AppointmentModel.findOne({_id:appointmentNumber}).exec()
        return appointment ? this.buildAppointment(appointment): null

    }

    async updateAppointment(appointmentNumber: string, appointment: AppointmentUpdateFields): Promise<IAppointment | null> {
        // Access the old appointment
        const oldAppointment = await AppointmentModel.findOne({_id:appointmentNumber}).lean().exec()

        if (!oldAppointment) 
            return null
        
        if (appointment.status){
            oldAppointment.status = appointment.status
        }

        if (appointment.date){
            oldAppointment.dateInformation.appointmentDate = appointment.date
        }

        if (appointment.days){
            oldAppointment.dateInformation.days = appointment.days
        }

        if (appointment.meetupLocation){
            oldAppointment.location.meetupLocation.coordinates = [appointment.meetupLocation.lon, appointment.meetupLocation.lat]
            oldAppointment.location.meetupLocation.address = appointment.meetupLocation.address
        }

        if (appointment.dropoffLocation){
            oldAppointment.location.dropoffLocation.coordinates = [appointment.dropoffLocation.lon, appointment.dropoffLocation.lat]
            oldAppointment.location.dropoffLocation.address = appointment.dropoffLocation.address
        }

        const newAppointment = await AppointmentModel.findOneAndUpdate({_id:appointmentNumber}, oldAppointment, {new: true}).exec()
        return newAppointment ? this.buildAppointment(newAppointment): null
    }

}