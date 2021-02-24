import { AppointmentStatusType, IAppointment, ITransaction } from '../../domain/declarations'
import {IClientModel, ClientCollectionName} from './clientmodel'; 
import mongoose, { Schema, Document } from 'mongoose'
import { ICarListingModel, CarListingCollectionName } from './carlistingmodel';

export interface ITransactionModel extends Document {
    transactionNumber: ITransaction['transactionNumber']
    total: ITransaction['total']
    description: ITransaction['description']
    date: ITransaction['date']
    issuer: Schema.Types.ObjectId | IClientModel // email
    receiver: Schema.Types.ObjectId | IClientModel // email
    status: ITransaction['status']
}

export interface IAppointmentModel extends Document {
    days: IAppointment['days']
    rentee: Schema.Types.ObjectId|IClientModel,
    dateAccepted: IAppointment['dateAccepted']
    appointmentDate: IAppointment['appointmentDate']
    status: IAppointment['status'],
    carListing: Schema.Types.ObjectId|ICarListingModel
    meetupLocation: IAppointment['meetupLocation']
    dropoffLocation: IAppointment['dropoffLocation']
    transactions: ITransactionModel[]
}

const TransactionSchema = new Schema({
    transactionNumber:{
        type: Number,
        required:true
    },
    total: {
        type: Number,
        required: true
    },
    date: { type: Date , required:true },
    issuer: { type:String, required:true, ref: ClientCollectionName },
    receiver: { type:String, required: true, ref:ClientCollectionName },
    status: { type:String, required:true } 
})

const AppointmentSchema = new Schema({
    days: {
        type: Number,
        required: true
    },
    rentee: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: ClientCollectionName
    },
    dateAccepted: {
        type: Date
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    status:{
        type:String
    },
    carListing: {
        type: Schema.Types.ObjectId,
        ref: CarListingCollectionName
    },
    meetupLocation: {
        type: String,
        required: true
    },
    dropoffLocation: {
        type: String,
        required: true
    },
    transactions: {
        type: [TransactionSchema],
        default: []
    }
})

export const AppointmentCollectionName = 'Appointment'
export const AppointmentModel = mongoose.model<IAppointmentModel>(AppointmentCollectionName, AppointmentSchema)