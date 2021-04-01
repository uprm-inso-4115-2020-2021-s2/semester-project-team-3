import { ICarListing, ICarListingRepository, IClient, makeCarListing } from "../../domain";
import { UseCaseOutput, ErrorMessages} from "../declarations";


export default function makeCreateCarListingUseCase(carListingRepo: ICarListingRepository) {
    
    return async (carListing: Partial<ICarListing>, owner: Partial<IClient>): Promise<UseCaseOutput<ICarListing>> => {
        
        carListing.owner = owner as IClient

        let builtListing;
        try {
            builtListing = makeCarListing(carListing)
        }
        catch (err) {
            return {success:false, msg: err.message}
        }

        const fetched = await carListingRepo.findByLicensePlate(builtListing.licensePlate)

        if (fetched) {
            return {
                success: false,
                msg:ErrorMessages.AlreadyExists
            }
        }

        const result = await carListingRepo.createCarListing(builtListing, builtListing.owner.email)

        if (!result) {
            return {
                success: false,
                msg: ErrorMessages.CreationError
            }
        }

        return {success: true, data:result}
    }


}