import { IClient, IRenteeReview, ErrorMsg } from "../declarations";

export class RenteeReview implements IRenteeReview{
    rating: number
    id: number | null
    review: string
    client: IClient

    constructor(data: Partial<IRenteeReview> = {}){

        if(!data.rating || !data.client){
            throw new Error(ErrorMsg.IllegalException)

        }

        this.rating = data.rating as number;
        this.id = data.id? data.id:null;
        this.review = data.review? data.review:"";
        this.client = data.client as IClient;

    }
}