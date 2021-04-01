import fs from 'fs'
import {ErrorMessages, UseCaseOutput} from '../declarations'
import { IClientRepository, ICarListingRepository, ICarListing } from "../../domain";

const removeFile = async (file:Express.Multer.File) => {
    fs.unlink(file.path, (err) => {
        console.error(`Unable to remove file ${file.path} please remove manually. Complete error: ${err?.message}`)
    })
}

export default function makeUploadCarImage(carListingRepo: ICarListingRepository, clientRepo:IClientRepository) {
    return async (licensePlate: string, owner: string, file:Express.Multer.File ): Promise<UseCaseOutput<ICarListing>> => {
        const listing = await carListingRepo.findByLicensePlate(licensePlate)
        if (!listing) {
            removeFile(file)
            return {
                success: false,
                msg: ErrorMessages.ListingDoesNotExist
            }
        }

        const fetchedOwner = await clientRepo.findByEmail(owner)
        if (!fetchedOwner) {
            removeFile(file)
            return {
                success: false,
                msg: ErrorMessages.ClientDoesNotExist
            }
        }

        if (!fetchedOwner.owns(listing)) {
            removeFile(file)
            return {
                success: false,
                msg: ErrorMessages.ClientDoesNotOwnListing
            }
        }

        if (listing.hasReachedImageCapacity()) {
            removeFile(file)
            return {
                success: false,
                msg: ErrorMessages.ListingImageCapacityReached
            }
        }

        const newLisiting = await carListingRepo.updateCarListing(listing.licensePlate, {carImages: [...listing.carImages, file.filename]});
        
        if (!newLisiting) {
            removeFile(file)
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