import { IAppointment, IBaseReview, ICarListing, IClient, IListingReview, IRenteeReview, ITransaction } from "./declarations";
import { Appointment } from "./implementations/appointment";
import { CarListing } from "./implementations/carlisting";
import { Client } from "./implementations/client";
import { ListingReview } from "./implementations/listingreview";
import { RenteeReview } from "./implementations/renteereview";
import { Transaction } from "./implementations/transaction";

export function makeClient(data: Partial<IClient>): IClient {
    return new Client(data)
}

export function makeCarListing(data: Partial<ICarListing>): ICarListing {
    return new CarListing(data)
}

export function makeTransaction(data: Partial<ITransaction>): ITransaction {
    return new Transaction(data)
}

export function makeAppointment(data: Partial<IAppointment>): IAppointment {
    return new Appointment(data)
}

export function makeRenteeReview(data: Partial<IRenteeReview>): IRenteeReview {
    return new RenteeReview(data)
}

export function makeListingReview(data: Partial<IListingReview>): IListingReview {
    return new ListingReview(data)
}