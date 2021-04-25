import { ICarListing, ErrorMsg, IClient, Location } from "../declarations";
import { makeClient  } from '../factories'

export class CarListing implements ICarListing{
    model: string
    isVerified: boolean
    brand: string
    year: number
    cancellationFee?: number
    licensePlate: string
    priceRate: number
    owner: IClient
    canDeliver: boolean 
    carLicenseImage: string | null
    carDescription: string 
    carImages: string[]
    carLocation: Location 
    title:string

    constructor(data: Partial<ICarListing> = {}){
        if(!data.model || !data.brand || !data.year || !data.licensePlate
            || !data.priceRate || !data.owner || !data.carDescription || !data.carLocation || data.carLocation.lat === undefined || data.carLocation.lon === undefined || !data.title){
            throw new Error(ErrorMsg.IllegalException)
        }
        this.model = data.model as string;
        this.isVerified = data.isVerified? data.isVerified: false;
        this.brand = data.brand as string;
        this.year = data.year as number;
        this.cancellationFee = data.cancellationFee;
        this.licensePlate = data.licensePlate as string;
        this.priceRate = data.priceRate as number;
        this.owner = makeClient(data.owner);
        this.canDeliver = data.canDeliver? data.canDeliver:true;
        this.carLicenseImage = data.carLicenseImage?data.carLicenseImage: null;
        this.carDescription = data.carDescription as string;
        this.carImages = data.carImages?data.carImages: [];
        this.carLocation = data.carLocation;
        this.title = data.title as string
        

    }
    hasReachedImageCapacity(): boolean {
        return this.carImages.length >= 5
    }
}