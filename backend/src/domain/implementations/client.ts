import { IAppointment, ICarListing, IClient, RenteeAppointmentRequest } from "../declarations";
import {ErrorMsg} from "../declarations";
import { makeAppointment } from "../factories";

export class Client implements IClient{
    name: string
    email: string
    dateOfBirth: Date | null
    isVerified: boolean 
    image: string | null
    driversLicense: string | null
    cellNumber: string | null

    constructor(data: Partial<IClient> = {}){
        if (!data.name || !data.email){
            throw new Error(ErrorMsg.IllegalException)
        }

        this.name = data.name as string;
        this.email = data.email as string;
        this.dateOfBirth= data.dateOfBirth ? data.dateOfBirth:null;
        this.isVerified= data.isVerified? data.isVerified: false;
        this.image =  data.image? data.image: null;
        this.driversLicense = data.driversLicense? data.driversLicense:null;
        this.cellNumber = data.cellNumber? data.cellNumber:null;
    }

    request(values: RenteeAppointmentRequest): IAppointment {
        return makeAppointment({
            carListing: values.listing,
            rentee: this,
            location: {
                meetupLocation: values.meetupLocation,
                dropoffLocation: values.dropoffLocation
            },
            dateInformation: {
                appointmentDate: values.date,
                days: values.days
            }
        })
    }
    
    owns(listing: ICarListing): boolean {
        return listing.owner.email === this.email
    }

    toDto(): Partial<IClient> {
        return {
            name: this.name,
            email: this.email,
            dateOfBirth: this.dateOfBirth,
            isVerified: this.isVerified,
            image: this.image,
            driversLicense: this.driversLicense,
            cellNumber: this.cellNumber
        }
    }
}