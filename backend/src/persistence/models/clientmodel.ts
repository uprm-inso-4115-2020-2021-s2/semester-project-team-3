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
        required: true
    },
    isVerified: { type:Boolean, default:false },
    image: { type:String },
    driversLicense: { type:String },
    cellNumber: { type:String, required:true }
})

export const ClientCollectionName = "Client" 
export const ClientModel = mongoose.model<IClientModel>(ClientCollectionName, ClientSchema)