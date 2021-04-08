import { ICarListing, ICarListingRepository, IClient, IClientRepository, makeCarListing } from "../../domain";
import { UseCaseOutput, ErrorMessages, IStorageAdapter, CreateCarListingRequest} from "../declarations";


export default function makeCreateCarListingUseCase(carListingRepo: ICarListingRepository, clientRepo: IClientRepository, storageAdapter: IStorageAdapter) {
    
    function cleanUp(request: CreateCarListingRequest):void {
        if (request.carImages)
                storageAdapter.removeFileArray(request.carImages)
        if (request.carLicenseImage)
            storageAdapter.removeFileArray(request.carLicenseImage)
    }

    return async (request:CreateCarListingRequest): Promise<UseCaseOutput<ICarListing>> => {
        
        const owner = await clientRepo.findByEmail(request.owner)

        if (!owner) {
            return {
                success: false,
                msg: ErrorMessages.ClientDoesNotExist
            }
        }

        let carImageUrls: string[] = []
        if(request.carImages) {
            let urls = await storageAdapter.uploadFileArray(request.carImages)
            if (urls && urls.length > 0) {
                carImageUrls = urls as string[]
            }
        }

        let carLicenseImage: string[] | null = null
        if (request.carLicenseImage) {
            carLicenseImage = await storageAdapter.uploadFileArray(request.carLicenseImage!)
        }

        let builtListing;
        try {
            builtListing = makeCarListing({
                licensePlate: request.licensePlate,
                carLocation: {
                    lat: request.carLocationLat,
                    lon: request.carLocationLon,
                    address: request.carLocationAddress
                },
                brand: request.brand,
                model: request.model,
                year: request.year,
                carImages: carImageUrls,
                carLicenseImage: carLicenseImage?carLicenseImage[0]:null,
                carDescription: request.carDescription,
                priceRate: request.priceRate,
                cancellationFee: request.cancellationFee,
                canDeliver: request.canDeliver,
                owner: owner
            })
        }
        catch (err) {
            cleanUp(request)
            return {success:false, msg: err.message}
        }

        const fetched = await carListingRepo.findByLicensePlate(builtListing.licensePlate)

        if (fetched) {
            cleanUp(request)
            return {
                success: false,
                msg:ErrorMessages.AlreadyExists
            }
        }

        const result = await carListingRepo.createCarListing(builtListing, builtListing.owner.email)

        if (!result) {
            cleanUp(request)
            return {
                success: false,
                msg: ErrorMessages.CreationError
            }
        }

        return {success: true, data:result}
    }

    
}