import { ObjectId } from "mongoose";
import { CarListingModel, ICarListingModel } from "../carlistingmodel";

export function makeValidCarListingModelSample(ownerId:ObjectId) {
    return new CarListingModel({
        carModel: "Corolla",
        brand: "Toyota",
        year: 2020,
        cancellationFee:25.56,
        licensePlate: "TES321",
        canDeliver: false,
        priceRate: 35,
        owner: ownerId,
        carDescription: " Testing creating a vehicle ",
        carImages: [""] ,
        carLocation: {
            type:'Point',
            coordinates: [30, 30],
            address: "San Juan"
        }
    } as Partial<ICarListingModel>)
}