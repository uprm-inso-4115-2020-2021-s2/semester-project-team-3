import * as dbHandler from './inmemory-dbconfig'
import { Appointment } from '../appointment'
import { IAppointment } from '../../declarations'
import { Client } from '../client'
import { CarListing } from '../carlisting'



/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('The Appointment class creates an appointment in the db', () => {

    it("should be able to create an appointment sucessfully", async () => {
        const client = new Client()

        const app = new Appointment(
            {
                days: 10,
                rentee: client,
                dateAccepted: null,
                appointmentDate: new Date(),
                status: "Pending",
                carListing: new CarListing(),
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
        const client = new Client()

        const app = new Appointment(
            {
                days: 10,
                rentee: client,
                dateAccepted: null,
                appointmentDate: new Date(),
                meetupLocation: " ",
                dropoffLocation: " ",
                transactions: []

            } as Partial<IAppointment> )

            expect(app).toBeUndefined
    
    });

    it("should not give an error when a non required field is not complete", async () => {
        const client = new Client()

        const app = new Appointment(
            {
                days: 10,
                rentee: client,
                appointmentDate: new Date(),
                status: "Pending",
                carListing: new CarListing(),
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