
import { IClient, ICarListing, IAppointment, Location } from "./declarations";


export interface IClientRepository {

    findByEmail(email: string):Promise<IClient | null> 
    createClient(client: IClient):Promise<IClient | null>
    updateClient(email:string, client: Partial<IClient>):Promise<IClient | null> 

}

export type CarListingQueryFields = {
    nearLocation?: {
        location: Location
    }
    brand?: ICarListing['brand'],
    carModel?: ICarListing['model'],
    canDeliver?: ICarListing['canDeliver'],
    year?: ICarListing['year'],
    licensePlate?: ICarListing['licensePlate'] 
    owner?: IClient['email']
}

export type CarListingUpdateFields = {
    title?: ICarListing['title']
    brand?: ICarListing['brand'],
    model?: ICarListing['model'],
    canDeliver?: ICarListing['canDeliver'],
    year?: ICarListing['year'],
    priceRate?: ICarListing['priceRate']
    cancellationFee?: ICarListing['cancellationFee']
    carLocation?: ICarListing['carLocation'],
    carImages?: ICarListing['carImages'] 
}

export interface ICarListingRepository {

    findAllByFields(fields: CarListingQueryFields, page?: number) : Promise<ICarListing[]>
    findByLicensePlate(licensePlate: string) : Promise<ICarListing | null >
    findByOwner(owner: string, page?: number) : Promise<ICarListing[]>
    updateCarListing(licensePlate: ICarListing["licensePlate"], listing: CarListingUpdateFields) : Promise<ICarListing | null>
    createCarListing(listing: Partial<ICarListing>, owner:string): Promise<ICarListing | null>

}

export interface IAppointmentRepository {

    createAppointment(appointment: IAppointment) : Promise<IAppointment | null>
    overlapExists(date: Date, days: number, listingPlate: string): Promise<boolean>
    findAppointmentByNumber(appointmentNumber: string): Promise<IAppointment | null>
    updateAppointment(appointmentNumber: string, appointment: AppointmentUpdateFields): Promise<IAppointment | null>
    findAllByFields(data:AppointmentQueryFields): Promise<IAppointment[]>

}

export type AppointmentQueryFields = {
    appointmentDate?: Date,
    rentee?:string,
    licensePlate?:string,
    page:number
}

export type AppointmentUpdateFields = {
    status?: IAppointment['status'],
    dateInformation?: IAppointment['dateInformation'],
    date?:IAppointment['dateInformation']['appointmentDate'],
    days?:IAppointment['dateInformation']['days'],
    meetupLocation?: IAppointment['location']['meetupLocation'],
    dropoffLocation?: IAppointment['location']['dropoffLocation'],
}