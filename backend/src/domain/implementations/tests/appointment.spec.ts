import { Appointment } from '../appointment'
import { IAppointment } from '../../declarations'
import { Client } from '../client'
import { CarListing } from '../carlisting'

describe('The Appointment class creates an appointment in the db', () => {

    it("should be able to create an appointment sucessfully", async () => {
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
            } 
        )

        const app = new Appointment(
            {
                days: 10,
                rentee: client,
                dateAccepted: null,
                appointmentDate: new Date(),
                status: "Pending",
                carListing: car,
                meetupLocation: " ",
                dropoffLocation: " ",
                transactions: []

            } as Partial<IAppointment> )

            expect(app.days).toBe(10)
            expect(app.rentee).toBe(client)
            expect(app.appointmentDate).toBeDefined
            expect(app.status).toBe("Pending")
            expect(app.carListing).toBeDefined
            expect(app.meetupLocation).toBe(" ")
            expect(app.dropoffLocation).toBe(" ")
            expect(app.transactions).toBeDefined

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
        

        const app = () => new Appointment(
            {
                days: 10,
                rentee: client,
                dateAccepted: null,
                appointmentDate: new Date(),
                meetupLocation: " ",
                dropoffLocation: " ",
                transactions: []

            } as Partial<IAppointment> )

            expect(app).toThrowError
    
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
                carLicenseImage: " ",
                carDescription: "Comfortable & brand new car",
                carImages: [],
                carLocation: "San Juan, PR"
            } 
        )
        
        const app = new Appointment(
            {
                days: 10,
                rentee: client,
                appointmentDate: new Date(),
                status: "Pending",
                carListing: car,
                meetupLocation: " ",
                dropoffLocation: " ",
                transactions: []

            } as Partial<IAppointment> )

            expect(app.days).toBe(10)
            expect(app.rentee).toBe(client)
            expect(app.appointmentDate).toBeDefined
            expect(app.status).toBe("Pending")
            expect(app.carListing).toBeDefined
            expect(app.meetupLocation).toBe(" ")
            expect(app.dropoffLocation).toBe(" ")
            expect(app.transactions).toBeDefined
    });

});