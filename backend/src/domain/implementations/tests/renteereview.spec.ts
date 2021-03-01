import { RenteeReview } from '../renteereview'
import { IRenteeReview } from '../../declarations'
import { Client } from '../client'


describe('The RenteeReview class models the rentee review entity in the domain', () => {

    it("should be able to create a Rentee Review sucessfully", async () => {
        const client = new Client(
            {
                name: "Lola Rodz",
                email:"lola@gmail.com",
                dateOfBirth: new Date(),
                cellNumber: "787-355-7783"
            }
        )

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
          const client = new Client(
        {
            name: "Lola Rodz",
            email:"lola@gmail.com",
            dateOfBirth: new Date(),
            cellNumber: "787-355-7783"
        }
    )

        const rr = () => new RenteeReview(
            {
                rating: 5,
                id: 1,
                review: "great work"

            } as Partial<IRenteeReview> )

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