import { CarListingQueryFields, ICarListing, ICarListingRepository, IClientRepository } from "../domain";
import { ErrorMessages, UseCaseOutput } from "./declarations";

export default function makeGetMyListingsUseCase(carListingRepo: ICarListingRepository, clientRepo: IClientRepository) {

    return async function(fields:CarListingQueryFields, page:number = 1): Promise<UseCaseOutput<ICarListing[]>> {
        const owner = await clientRepo.findByEmail(fields.owner!)
        if (!owner) {
            return {
                success: false,
                msg: ErrorMessages.ClientDoesNotExist
            }
        }

        const listings = await carListingRepo.findAllByFields(
            fields,
            page
        )



        return {success: true, data:listings}
    }

}