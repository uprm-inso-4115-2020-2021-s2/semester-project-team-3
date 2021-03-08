import { ICarListing } from '../../domain/declarations'
import mongoose, { Schema, Document } from 'mongoose'
import { IClientModel, ClientCollectionName } from './clientmodel'


export interface ICarListingModel extends Document {

    carModel: ICarListing['model']
    isVerified: ICarListing['isVerified']
    brand: ICarListing['brand']
    year: ICarListing['year']
    cancellationFee: ICarListing['cancellationFee']
    licensePlate: ICarListing['licensePlate']
    priceRate: ICarListing['priceRate']
    owner: Schema.Types.ObjectId | IClientModel
    canDeliver: ICarListing['canDeliver'] 
    carLicenseImage: ICarListing['carLicenseImage']
    carDescription: ICarListing['carDescription']
    carImages: ICarListing['carImages'] 
    carLocation: ICarListing['carLocation'] 

}


const CarListingSchema = new Schema({

    carModel:{type:String, required:true},
    isVerified:{type:Boolean, default:false},
    brand:{type:String, required:true},
    year:{type:Number, required: true},
    cancellationFee:{type:String, required: true},
    licensePlate: {type:String, required: true, unique:true},
    priceRate:{type:Number, required:true},
    owner:{type: String, required:true, ref:ClientCollectionName},
    canDeliver:{type: Boolean, default:true},
    carLicenseImage:{type: String},
    carDescription:{type: String, required:true},
    carImages:{type:[String] , default:[] },
    carLocation:{type:String, required:true}

})

export const CarListingCollectionName = 'CarListing'
export const CarListingModel = mongoose.model<ICarListingModel>(CarListingCollectionName, CarListingSchema)