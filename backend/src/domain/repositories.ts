
import { IClient, ICarListing } from "./declarations";


export interface IClientRepository {

    findByEmail(email: string):Promise<IClient | null> 
    createClient(client: IClient):Promise<IClient | null>
    updateClient(email:string, client: Partial<IClient>):Promise<IClient | null> 

}

export type CarListingQueryFields = {
    cities?: string[]
    brand?: ICarListing['brand'],
    model?: ICarListing['model'],
    canDeliver?: ICarListing['canDeliver'],
    year?: ICarListing['year'],
    licensePlate?: ICarListing['licensePlate'] 
}

export interface ICarListingRepository {

    findAllByFields(fields: CarListingQueryFields, page?: number) : Promise<ICarListing[]>
    findByLicensePlate(licensePlate: string) : Promise<ICarListing | null >
    findByOwner(owner: string, page?: number) : Promise<ICarListing[]>
    updateCarListing(licensePlate: ICarListing["licensePlate"], listing: Partial<ICarListing>) : Promise<ICarListing | null>
    createCarListing(listing: Partial<ICarListing>, owner:string): Promise<ICarListing | null>

}