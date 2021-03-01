import * as dbHandler from './inmemory-dbconfig'
import { RenteeReview } from '../renteereview'
import { IRenteeReview } from '../../declarations'
import { Client } from '../client'

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('The Rentee Review class creates a Rentee Review in the db', () => {

    it("should be able to create a Rentee Review sucessfully", async () => {
        const client = new Client()

        const rr = new RenteeReview(
            {
                rating: 5,
                id: 1,
                review: "great work",
                client: client


            } as Partial<IRenteeReview> )

            expect(rr.rating).toBe(5)
            expect(rr.id).toBe(1)
            expect(rr.review).toBe("great work")
            expect(rr.client).toBeDefined

        });


    it("should give an error when all the required fields are not complete", async () => {
        const client = new Client()

        const rr = new RenteeReview(
            {
                rating: 5,
                id: 1,
                review: "great work"

            } as Partial<IRenteeReview> )

            expect(rr).toBeUndefined
    
    });

    it("should not give an error when a non required field is not complete", async () => {
        const client = new Client()

        const rr = new RenteeReview(
            {
                rating: 5,
                review: "great work",
                client: client

            } as Partial<IRenteeReview> )

            expect(rr.rating).toBe(5)
            expect(rr.review).toBe("great work")
            expect(rr.client).toBeDefined
    });

});