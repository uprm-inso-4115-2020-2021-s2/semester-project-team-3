import mongoose, { Schema, Document } from "mongoose"
import { ITransaction } from "../../domain"
import { ClientCollectionName, IClientModel } from "./clientmodel"

export interface ITransactionModel extends Document {
    transactionNumber: ITransaction['transactionNumber']
    total: ITransaction['total']
    description: ITransaction['description']
    date: ITransaction['date']
    issuer: Schema.Types.ObjectId | IClientModel // email
    receiver: Schema.Types.ObjectId | IClientModel // email
    status: ITransaction['status']
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
    issuer: { type:Schema.Types.ObjectId, required:true, ref:ClientCollectionName },
    receiver: { type:Schema.Types.ObjectId, required: true, ref:ClientCollectionName },
    status: { type:String, required:true } 
})

export const TransactionCollectionName = "TransactionCollectionName"
export const AppointmentModel = mongoose.model<ITransactionModel>(TransactionCollectionName, TransactionSchema)