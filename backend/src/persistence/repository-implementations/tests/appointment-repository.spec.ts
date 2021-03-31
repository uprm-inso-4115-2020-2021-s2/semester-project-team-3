import { IAppointmentRepository } from '../../../domain';
import { AppointmentStatusType } from '../../../domain/declarations';
import * as dbHandler from '../../inmemory-dbconfig'
import { ClientModel, IClientModel, ICarListingModel } from '../../models';
import { IAppointmentModel } from '../../models/appointmentmodel';
import { makeValidCarListingModelSample } from '../../models/tests/helper'
import { AppointmentModel } from '../../models/appointmentmodel';
import AppointmentRepository from '../appointment-repository';

/**
 * Connect to a new in-memory database before running any tests.
 */
let appointmentRepo: IAppointmentRepository

beforeAll(async () => {
    await dbHandler.connect()
    appointmentRepo = new AppointmentRepository()
}); 


/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe(` 
    Appointment repository is in hcarge of abstracting 
    the persistance and retrieval of appointments `, () => {
    

    it("Should be able to find overlapping appointments", async () => {
        const person = new ClientModel({
            email:"test@test.com",
            name:"Pedro",
            dateOfBirth: new Date("2000-02-10"),
            isVerified: false,
            cellNumber:"7875550000"
        } as IClientModel)

        await person.save()

        const carListing = makeValidCarListingModelSample(person!._id)
        
        await carListing.save()

        const newAppointment = new AppointmentModel({
            rentee: person._id,
            carListing: carListing._id,
            status: AppointmentStatusType.Accepted,
            dateInformation: {
                appointmentDate: new Date("2020-09-27"),
                days: 7
            },
            location: {
                meetupLocation: {
                    type: 'Point',
                    coordinates: [0, 0],
                },
                dropoffLocation: {
                    type: 'Point',
                    coordinates: [0, 0]
                }
            }
        })
        
        await newAppointment.save()
        let fetched = await appointmentRepo.overlapExists(new Date("2020-09-26"), 20, carListing.licensePlate)
        expect(fetched).toBeTruthy()
        fetched = await appointmentRepo.overlapExists(new Date("2020-08-03"), 7, carListing.licensePlate)
        expect(fetched).toBeFalsy()
        
    })
    

})