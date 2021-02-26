import { ObjectId } from "mongoose";
import { CarListingModel, ICarListingModel } from "../carlistingmodel";

export function makeValidCarListingModelSample(ownerId:ObjectId) {
    return new CarListingModel({
        carModel: "Corolla",
        brand: "Toyota",
        year: 2020,
        cancellationFee:25.56,
        licensePlate: "TES321",
        priceRate: 35,
        owner: ownerId,
        carDescription: " Testing creating a vehicle ",
        carImages: [""] ,
        carLocation: " Location of car in coordinates that can be parsed by gmaps "
    } as Partial<ICarListingModel>)
}