import * as dbHandler from './inmemory-dbconfig'
import { ListingReview } from '../listingreview'
import { IListingReview } from '../../declarations'
import { Client } from '../client'

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('The Listing Review class creates a Listing Review in the db', () => {

    it("should be able to create a Listing Review sucessfully", async () => {
        const client = new Client(
            {
                name: "Lola Rodz",
                email:"lola@gmail.com",
                dateOfBirth: new Date(),
                cellNumber: "787-355-7783"
            }
        )

        const rr = new ListingReview(
            {
                rating: 5,
                id: 1,
                review: "great work",
                owner: client


            } as Partial<IListingReview> )

            expect(rr.rating).toBe(5)
            expect(rr.id).toBe(1)
            expect(rr.review).toBe("great work")
            expect(rr.owner).toBeDefined

        });


    it("should give an error when all the required fields are not complete", async () => {
          const client = new Client(
        {
            name: "Lola Rodz",
            email:"lola@gmail.com",
            dateOfBirth: new Date(),
            cellNumber: "787-355-7783"
        }
    )

        const rr = () => new ListingReview(
            {
                rating: 5,
                id: 1,
                review: "great work"

            } as Partial<IListingReview> )

            expect(rr).toThrowError
    
    });

    it("should not give an error when a non required field is not complete", async () => {
        const client = new Client(
            {
                name: "Lola Rodz",
                email:"lola@gmail.com",
                dateOfBirth: new Date(),
                cellNumber: "787-355-7783"
            }
        )

        const rr = new ListingReview(
            {
                rating: 5,
                review: "great work",
                owner: client

            } as Partial<IListingReview> )

            expect(rr.rating).toBe(5)
            expect(rr.review).toBe("great work")
            expect(rr.owner).toBeDefined
    });

});