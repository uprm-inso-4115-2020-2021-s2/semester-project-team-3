import { CarListingQueryFields, ICarListingRepository } from "../domain";


export default function makeSearchListing(carListingRepo: ICarListingRepository) {
    return async (fields:CarListingQueryFields, page:number = 1) => {
        const result = await carListingRepo.findAllByFields(fields, page)

        return {
            success: true,
            data:result
        }
    }
}