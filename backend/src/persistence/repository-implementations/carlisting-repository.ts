import { LeanDocument } from "mongoose";
import { ICarListingRepository, ICarListing, makeCarListing, makeClient, CarListingQueryFields, IClient, CarListingUpdateFields } from "../../domain";
import { ICarListingModel, CarListingModel, IClientModel, ClientModel } from '../models'


export default class CarListingRepository implements ICarListingRepository {
    

    private readonly PER_PAGE = 10;

    private buildListing(listing: LeanDocument<ICarListingModel>, owner: LeanDocument<IClientModel>): ICarListing {
        return makeCarListing({
            ...listing, 
            owner:owner as IClient, 
            model:listing.carModel, 
            brand: listing.brand,
            carLocation: {lat: listing.carLocation.coordinates[1], lon: listing.carLocation.coordinates[0], address: listing.carLocation.address}
        })
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
        
        let {owner, nearLocation, ...query} = fields; 
        const ownerModel = await ClientModel.findOne({email:fields.owner}).exec()
        let location = nearLocation? {
            carLocation: {
                $near: {
                $geometry: {
                    type:'Point',
                    coordinates: [nearLocation?.location.lon, nearLocation?.location.lat]
                }
        }}} : {}
        let ownerSection = ownerModel? {owner: ownerModel?._id} : {}

        let finalQuery = {
            ...location,
            ...query,
            ...ownerSection
        }

      

        const fetch = await CarListingModel
            .find(finalQuery)
            .skip(this.PER_PAGE*(page - 1))
            .limit(this.PER_PAGE)
            .populate('owner')
            .lean()
            .exec()

        return fetch.map((val) => this.buildListing(val, val.owner as LeanDocument<IClientModel>))
    }
    
    async updateCarListing(licensePlate: string, listing: CarListingUpdateFields): Promise<ICarListing | null> {
        const fetched = await CarListingModel.findOne({licensePlate:licensePlate}).lean().exec()

        if (!fetched) 
            return null
        
        let {carLocation, model, ...vehicle} = listing
        let vehicleCasted = {...vehicle} as Partial<ICarListingModel>

        if (model)
            vehicleCasted!.carModel = model

        if (carLocation) {
            vehicleCasted.carLocation = {
                type: 'Point',
                coordinates: [carLocation!.lon, carLocation!.lat],
                address: carLocation!.address       
            }       
        }

        const saved = await CarListingModel
            .findOneAndUpdate(
                {licensePlate: licensePlate},
                vehicleCasted,
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
            owner: fetchedOwner._id,
            carLocation: {
                type: 'Point',
                coordinates: [listing.carLocation?.lon, listing.carLocation?.lat],
                address:listing.carLocation?.address
            }
        })

        try {
            await newListing.save()
        } catch {
            return null
        }
        
        return this.buildListing(newListing.toObject(), fetchedOwner);
    }

}