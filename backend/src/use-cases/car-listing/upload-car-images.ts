import fs from 'fs'
import {ErrorMessages, UseCaseOutput, File, IStorageAdapter} from '../declarations'
import { IClientRepository, ICarListingRepository, ICarListing } from "../../domain";

const removeFile = async (file:File) => {
    fs.unlink(file.path, (err) => {
        console.error(`Unable to remove file ${file.path} please remove manually. Complete error: ${err?.message}`)
    })
}



export default function makeUploadCarImage(carListingRepo: ICarListingRepository, clientRepo:IClientRepository, storageAdapter: IStorageAdapter) {
    return async (licensePlate: string, owner: string, file:File ): Promise<UseCaseOutput<ICarListing>> => {
        const listing = await carListingRepo.findByLicensePlate(licensePlate)
        if (!listing) {
            
            return {
                success: false,
                msg: ErrorMessages.ListingDoesNotExist
            }
        }

        const fetchedOwner = await clientRepo.findByEmail(owner)
        if (!fetchedOwner) {
     
            return {
                success: false,
                msg: ErrorMessages.ClientDoesNotExist
            }
        }

        if (!fetchedOwner.owns(listing)) {

            return {
                success: false,
                msg: ErrorMessages.ClientDoesNotOwnListing
            }
        }

        if (listing.hasReachedImageCapacity()) {

            return {
                success: false,
                msg: ErrorMessages.ListingImageCapacityReached
            }
        }

        const path = await storageAdapter.upload(file)

        if (!path) {
            return {
                success: false,
                msg: ErrorMessages.CreationError
            }
        }

        const newLisiting = await carListingRepo.updateCarListing(listing.licensePlate, {carImages: [...listing.carImages, path]});
        
        if (!newLisiting) {
            storageAdapter.remove(file)
            return {
                success: false,
                msg: ErrorMessages.CreationError
            }
        }

        return {
            success: true,
            data: newLisiting
        }

    }
}