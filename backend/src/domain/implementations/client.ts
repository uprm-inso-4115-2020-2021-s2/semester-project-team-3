import { IClient } from "../declarations";
import {ErrorMsg} from "../declarations";

export class Client implements IClient{
    name: string
    email: string
    dateOfBirth: Date
    isVerified: boolean 
    image: string | null
    driversLicense: string | null
    cellNumber: string

    constructor(public data: Partial<IClient> = {}){
        if (!data.name || !data.email || !data.dateOfBirth || !data.cellNumber){
            throw new Error(ErrorMsg.IllegalException)
        }

        this.name = data.name as string;
        this.email = data.email as string;
        this.dateOfBirth= data.dateOfBirth as Date;
        this.isVerified= data.isVerified? data.isVerified: false;
        this.image =  data.image? data.image: null;
        this.driversLicense = data.driversLicense? data.driversLicense:null;
        this.cellNumber = data.cellNumber as string;
    }
}