import {ErrorMsg, IAppointment,IClient,AppointmentStatusType,ICarListing,ITransaction} from "../declarations";

export class Appointment implements IAppointment{

    appointmentNumber: number|null;
    days: number;
    rentee: IClient;
    dateAccepted: Date|null;
    appointmentDate: Date;
    status: AppointmentStatusType;
    carListing: ICarListing;
    meetupLocation: string;
    dropoffLocation: string;
    transactions: ITransaction[];

    constructor(public data: Partial<IAppointment> = {}){
        if (!data.days || !data.rentee || !data.appointmentDate || !data.carListing || !data.dropoffLocation || !data.meetupLocation){
            throw new Error(ErrorMsg.IllegalException)
        }
        this.appointmentNumber = data.appointmentNumber?data.appointmentNumber:null;
        this.days = data.days as number; 
        this.rentee = data.rentee as IClient ; 
        this.dateAccepted = data.dateAccepted? data.dateAccepted:null; 
        this.appointmentDate = data.appointmentDate as Date;
        this.status = data.status? data.status : AppointmentStatusType.Pending; 
        this.carListing = data.carListing as ICarListing; 
        this.meetupLocation = data.meetupLocation as string; 
        this.dropoffLocation = data.dropoffLocation as string; 
        this.transactions = data.transactions? data.transactions: [];

    }

}