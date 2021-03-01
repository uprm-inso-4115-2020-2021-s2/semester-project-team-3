import { IClient } from '../../domain/declarations'
import mongoose, { Schema, Document } from 'mongoose'


export interface IClientModel extends IClient, Document {

}

const ClientSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    isVerified: { type:Boolean, default:false },
    image: { type:String },
    driversLicense: { type:String, default:null },
    cellNumber: { type:String, default: null }
})

export const ClientCollectionName = "Client" 
export const ClientModel = mongoose.model<IClientModel>(ClientCollectionName, ClientSchema)