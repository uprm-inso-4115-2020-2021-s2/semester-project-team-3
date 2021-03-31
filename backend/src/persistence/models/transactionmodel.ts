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
    },
    total: {
        type: Number,
    },
    date: { type: Date },
    issuer: { type:Schema.Types.ObjectId, ref:ClientCollectionName },
    receiver: { type:Schema.Types.ObjectId,  ref:ClientCollectionName },
    status: { type:String} 
})

export const TransactionCollectionName = "TransactionCollectionName"
export const TransactionModel = mongoose.model<ITransactionModel>(TransactionCollectionName, TransactionSchema)