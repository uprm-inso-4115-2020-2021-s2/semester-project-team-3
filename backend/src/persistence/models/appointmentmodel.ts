import {  AppointmentStatusType, IAppointment } from '../../domain'
import {IClientModel, ClientCollectionName} from './clientmodel'; 
import mongoose, { Schema, Document, ObjectId } from 'mongoose'
import { ICarListingModel, CarListingCollectionName } from './carlistingmodel';
import { ITransactionModel, TransactionCollectionName } from './transactionmodel';


export interface IAppointmentModel extends Document {

    rentee: ObjectId | IClientModel,
    status: AppointmentStatusType,
    carListing: ObjectId | ICarListingModel,
    dateInformation: {
        appointmentDate: Date,
        days: number
    },
    location: {
        meetupLocation: {type:string, coordinates:number[], address?:string},
        dropoffLocation: {type:string, coordinates:number[], address?:string}
    },
    postAcceptInformation: {
        dateAccepted: Date,
        transactions: ObjectId[]|ITransactionModel[]
    }
}


const AppointmentSchema = new Schema({
    rentee: {type:Schema.Types.ObjectId, ref:ClientCollectionName},
    status: String,
    carListing: {type:Schema.Types.ObjectId, ref:CarListingCollectionName},
    dateInformation: {
        appointmentDate: Date,
        days: Number
    },
    location: {
        meetupLocation: {
            type: { 
                type:String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number]
            },
            address: String
        },
        dropoffLocation: {
            type: { 
                type:String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number]
            },
            address: String
        }
    },
    postAcceptInformation: {
        dateAccepted: Date,
        transactions: {
            type: [Schema.Types.ObjectId],
            ref: TransactionCollectionName
        }
    }
})

AppointmentSchema.index({location: {meetupLocation: '2dsphere', dropoffLocations:'2dsphere'}})


export const AppointmentCollectionName = 'Appointment'
export const AppointmentModel = mongoose.model<IAppointmentModel>(AppointmentCollectionName, AppointmentSchema)