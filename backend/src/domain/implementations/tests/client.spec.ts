import * as dbHandler from './inmemory-dbconfig'
import { IClient} from '../../declarations'
import { Client } from '../client'

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('The Client class creates a client in the db', () => {

    it("should be able to create an client sucessfully", async () => {

        const client = new Client(
            {
                name: "Lola Perez",
                email:"lolaperez@gmail.com",
                dateOfBirth: new Date(),
                isVerified: true,
                image: " ",
                driversLicense: " ",
                cellNumber: "787-675-5439"

            } as Partial<IClient> )

            expect(client.name).toBe("Lola Perez")
            expect(client.email).toBe("lolaperez@gmail.com")
            expect(client.dateOfBirth).toBeDefined
            expect(client.isVerified).toBe(true)
            expect(client.image).toBe(" ")
            expect(client.driversLicense).toBe(" ")
            expect(client.cellNumber).toBe("787-675-5439")
        });


    it("should give an error when all the required fields are not complete", async () => {
        
        const client = new Client(
            {
                name: "Lola Perez",
                email:"lolaperez@gmail.com",
                isVerified: true,
                image: " ",
                driversLicense: " ",

            } as Partial<IClient> )

            expect(client).toBeUndefined
    
    });

    it("should not give an error when a non required field is not complete", async () => {
        
        const client = new Client(
        {
            name: "Lola Perez",
            email:"lolaperez@gmail.com",
            dateOfBirth: new Date(),
            isVerified: true,
            cellNumber: "787-675-5439"

        } as Partial<IClient> )

        expect(client.name).toBe("Lola Perez")
        expect(client.email).toBe("lolaperez@gmail.com")
        expect(client.dateOfBirth).toBeDefined
        expect(client.isVerified).toBe(true)
        expect(client.cellNumber).toBe("787-675-5439")
        
    });

});