import { IClient, IListingReview, ErrorMsg } from "../declarations";

export class ListingReview implements IListingReview{
    rating: number
    id: number | null
    review: string
    owner: IClient

    constructor(public data: Partial<IListingReview> = {}){

        if(!data.rating || !data.owner){
            throw new Error(ErrorMsg.IllegalException)

        }

        this.rating = data.rating as number;
        this.id = data.id? data.id:null;
        this.review = data.review? data.review:"";
        this.owner = data.owner as IClient;

    }
}