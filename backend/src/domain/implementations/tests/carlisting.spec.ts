import { ICarListing} from '../../declarations'
import { CarListing } from '../carlisting'
import {Client} from '../client'

describe('The Car Listing class models the car listing entity in the domain', () => {

    it("should be able to create an client sucessfully", async () => {
        const client = new Client(
            {
                name: "Lola Rodz",
                email:"lola@gmail.com",
                dateOfBirth: new Date(),
                cellNumber: "787-355-7783"
            }
        )

        const car = new CarListing(
            {
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
                carLocation: "San Juan, PR"

            } as Partial<ICarListing> )
            
            expect(car.model).toBe("corolla")
            expect(car.isVerified).toBe(false)
            expect(car.brand).toBe("toyota")
            expect(car.year).toBe(2020)
            expect(car.cancellationFee).toBe(50)
            expect(car.licensePlate).toBe("LOL990")
            expect(car.priceRate).toBe(33)
            expect(car.owner).toBeDefined
            expect(car.canDeliver).toBeFalsy
            expect(car.carLicenseImage).toBe(" ")
            expect(car.carDescription).toBe("Comfortable & brand new car")
            expect(car.carImages).toBeDefined
            expect(car.carLocation).toBe("San Juan, PR")
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
        const car = () => new CarListing(
            {
                model: "corolla",
                isVerified: false,
                brand: "toyota",
                year: 2020,
                cancellationFee: 50,
                owner: client,
                canDeliver: false,
                carLicenseImage: " ",
                carDescription: "Comfortable & brand new car",
                carImages: [],
                carLocation: "San Juan, PR"

            } as Partial<ICarListing> )

            expect(car).toThrowError
    
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
        
        const car = new CarListing(
        {
            model: "corolla",
            isVerified: false,
            brand: "toyota",
            year: 2020,
            cancellationFee: 50,
            licensePlate: "LOL990",
            priceRate: 33,
            owner: client,
            canDeliver: false,
            carDescription: "Comfortable & brand new car",
            carLocation: "San Juan, PR"

        } as Partial<ICarListing> )

        expect(car.model).toBe("corolla")
        expect(car.isVerified).toBe(false)
        expect(car.brand).toBe("toyota")
        expect(car.year).toBe(2020)
        expect(car.cancellationFee).toBe(50)
        expect(car.licensePlate).toBe("LOL990")
        expect(car.priceRate).toBe(33)
        expect(car.owner).toBeDefined
        expect(car.canDeliver).toBeFalsy
        expect(car.carDescription).toBe("Comfortable & brand new car")
        expect(car.carLocation).toBe("San Juan, PR")
        
    });

});