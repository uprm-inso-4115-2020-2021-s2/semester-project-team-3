import { LeanDocument } from "mongoose";
import { ICarListingRepository, ICarListing, makeCarListing, makeClient, CarListingQueryFields, IClient } from "../../domain";
import { ICarListingModel, CarListingModel, IClientModel, ClientModel } from '../models'


export default class CarListingRepository implements ICarListingRepository {
    

    private readonly PER_PAGE = 10;

    private buildListing(listing: LeanDocument<ICarListingModel>, owner: LeanDocument<IClientModel>): ICarListing {
        return makeCarListing({...listing, owner:owner as IClient, model:listing.carModel, brand: listing.brand })
    }

    async findByLicensePlate(licensePlate: string): Promise<ICarListing | null> {
        const fetched = await CarListingModel
            .findOne({licensePlate: licensePlate})
            .populate('owner')
            .lean()
            .exec()

        return fetched?this.buildListing(fetched, fetched.owner as IClientModel):null
    }

    async findByOwner(owner: string, page: number = 1): Promise<ICarListing[]> {
        
        if (page && page <= 0)
            return []

        const fetched_owner = await ClientModel.findOne({email:owner}).lean().exec()

        if (!fetched_owner) 
            return []
    
        const listings = await CarListingModel
                .find({owner:fetched_owner._id})
                .skip(this.PER_PAGE*(page - 1))
                .limit(this.PER_PAGE)
                .lean()
                .exec()
        
        return listings.map((val) => this.buildListing(val, fetched_owner));

    }
   

    async findAllByFields(fields: CarListingQueryFields, page: number = 1) : Promise<ICarListing[]>{
        
        const fetch = await CarListingModel
            .find()
            .or([
                {brand: fields.brand}, 
                {carModel: fields.model}, 
                {canDeliver: fields.canDeliver}, 
                {year: fields.year}, 
                {licensePlate: fields.licensePlate},
                {carLocation: {$in: fields.cities}}
            ])
            .skip(this.PER_PAGE*(page - 1))
            .limit(this.PER_PAGE)
            .populate('owner')
            .lean()
            .exec()
        
        return fetch.map((val) => this.buildListing(val, val.owner as LeanDocument<IClientModel>))
    }
    
    async updateCarListing(licensePlate: string, listing: Partial<ICarListing>): Promise<ICarListing | null> {
        const fetched = await CarListingModel.findOne({licensePlate:licensePlate}).lean().exec()

        if (!fetched) 
            return null

        let vehicle = {} as Partial<ICarListingModel>

        if (listing.brand) 
            vehicle!.brand = listing.brand

        if (listing.model)
            vehicle!.carModel = listing.model

        if (listing.year)
            vehicle!.year = listing.year

        if (listing.priceRate)
            vehicle!.priceRate = listing.priceRate

        if (listing.carLocation)
            vehicle!.carLocation = listing.carLocation        

        if (listing.canDeliver)
            vehicle!.canDeliver = listing.canDeliver
        
        if (listing.carImages)
            vehicle!.carImages = listing.carImages
        
        if (listing.carLicenseImage) 
            vehicle!.carLicenseImage = listing.carLicenseImage
        
        if (listing.cancellationFee) 
            vehicle!.cancellationFee = listing.cancellationFee

        if (listing.carDescription)
            vehicle!.carDescription = listing.carDescription

        const saved = await CarListingModel
            .findOneAndUpdate(
                {licensePlate: licensePlate},
                vehicle,
                {new: true}
            ).exec()
            
        if (!saved) {
            return null
        }

        await saved.populate('owner').execPopulate()

        const plainOwner = (saved.owner as IClientModel).toObject()
            
        return this.buildListing(saved.toObject(), plainOwner)
    }

    async createCarListing(listing: Partial<ICarListing>, owner: string): Promise<ICarListing | null> {
        const fetchedOwner = await ClientModel.findOne({email:owner}).lean().exec()
        
        if (!fetchedOwner)
            return null
        
        const newListing = new CarListingModel({
            ...listing,
            carModel: listing.model,
            owner: fetchedOwner._id
        })

        try {
            await newListing.save()
        } catch {
            return null
        }
        
        return this.buildListing(newListing.toObject(), fetchedOwner);
    }

}