import { ICarListing, IClient} from '../../declarations'
import { CarListing } from '../carlisting';
import { Client } from '../client'

describe('The Client class models the client entity in the domain', () => {

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
        
        const client = () => new Client(
            {
                name: "Lola Perez",
                email:"lolaperez@gmail.com",
                isVerified: true,
                image: " ",
                driversLicense: " ",

            } as Partial<IClient> )

            expect(client).toThrowError
    
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

    it("should probably reflect if owns a carListing", () => {
        
        const client = new Client({
            name: "Pedro",
            email: "pedro.pedro@pedro.com",
            dateOfBirth: new Date(),
            isVerified: false,
            cellNumber: '777-777-7777'
        })

        const car = new CarListing(
            {
                title: "testing",
                model: "corolla",
                isVerified: false,
                brand: "toyota",
                year: 2020,
                cancellationFee: 50,
                licensePlate: "LOL990",
                priceRate: 33,
                owner: client,
                canDeliver: false,
                carLicenseImage: " ",
                carDescription: "Comfortable & brand new car",
                carImages: [],
                carLocation: {lat: 0, lon: 0, address:""}

            } as Partial<ICarListing> )
        
        expect(client.owns(car)).toBeTruthy()

    })



});