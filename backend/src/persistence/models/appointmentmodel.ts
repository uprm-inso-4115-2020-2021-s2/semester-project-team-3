import {  IAppointment } from '../../domain'
import {IClientModel, ClientCollectionName} from './clientmodel'; 
import mongoose, { Schema, Document, ObjectId } from 'mongoose'
import { ICarListingModel, CarListingCollectionName } from './carlistingmodel';
import { ITransactionModel, TransactionCollectionName } from './transactionmodel';


export interface IAppointmentModel extends Document {

    rentee: ObjectId | IClientModel,
    status: string,
    carListing: ObjectId | ICarListingModel,
    dateInformation: {
        appointmentDate: Date,
        days: number
    },
    location: {
        meetupLocation: {type:string, coordinates:number[]},
        dropoffLocation: {type:string, coordinates:number[]}
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
        },
        dropoffLocation: {
            type: { 
                type:String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number]
            },
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