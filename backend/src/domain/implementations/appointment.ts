import { IAppointment } from "../declarations";
import {IClient} from "../declarations";
import {AppointmentStatusType} from "../declarations";
import {ICarListing} from "../declarations";
import {ITransaction} from "../declarations";


export class Appointment implements IAppointment{

    appointmentNumber: number|undefined;
    days: number|undefined;
    rentee: IClient|undefined;
    dateAccepted: Date|undefined;
    appointmentDate: Date|undefined;
    status: AppointmentStatusType|undefined;
    carListing: ICarListing|undefined;
    meetupLocation: string|undefined;
    dropoffLocation: string|undefined;
    transactions: ITransaction[]|undefined;

    constructor(public data: Partial<Appointment> = {}){
        this.appointmentNumber = data.appointmentNumber;
        this.days = data.days;
        this.rentee = data.rentee;
        this.dateAccepted = data.dateAccepted;
        this.appointmentDate = data.appointmentDate;
        this.status = data.status;
        this.carListing = data.carListing;
        this.meetupLocation = data.meetupLocation;
        this.dropoffLocation = data.dropoffLocation;
        this.transactions = data.transactions;

    }

    // overlaps: (arg0:IAppointment) => boolean
    // accept: () => void
    // deny: () => void
    // deliver: () => void
    // isPending: () => boolean
    // getPrice: () => number
    // securityDeposit: () => number
}