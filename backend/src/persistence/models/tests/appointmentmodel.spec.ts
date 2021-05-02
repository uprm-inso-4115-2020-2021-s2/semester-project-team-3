import * as dbHandler from '../../dbconfig'
import { ClientModel, IClientModel } from '../clientmodel';
import { AppointmentCollectionName, AppointmentModel, IAppointmentModel } from '../appointmentmodel'
import { makeValidCarListingModelSample } from './helper';
import { AppointmentStatusType, IAppointmentRepository } from '../../../domain';
import { MongoMemoryServer } from 'mongodb-memory-server';
import AppointmentRepository from '../../repository-implementations/appointment-repository';


let appointmentRepo:IAppointmentRepository

let mongod:MongoMemoryServer
beforeAll(async () => {
    mongod = new MongoMemoryServer()
    await dbHandler.connect(await mongod.getUri())
    appointmentRepo = new AppointmentRepository()
});

/**
 * Remove and close the db and server.
 */
afterAll(async () =>{ 
    await dbHandler.closeDatabase()
    await mongod.stop()
});

/**
 * Clear all test data after every test.
 */
 afterEach(async () => await dbHandler.clearDatabase());

/**
 * Create sample user in db
 */
beforeEach(async () => {
    const person = new ClientModel({
        email:"test@test.com",
        name:"Pedro",
        dateOfBirth: new Date("2000-02-10"),
        isVerified: false,
        cellNumber:"7875550000"
    } as IClientModel)

    await person.save()
})


describe("The appointment model represents an appointment in the database", () => {

    it("should be created and persisted correctly and shoul be able to be updated", async ()=> {
        const person = await ClientModel.findOne({email:"test@test.com"}).exec()
        
        const carListing = makeValidCarListingModelSample(person!._id)
        
        await carListing.save()

        const newAppointment = new AppointmentModel({
            rentee: person!._id,
            status: AppointmentStatusType.Pending,
            carListing: carListing!._id,
            dateInformation: {
                appointmentDate: new Date(),
                days: 7
            },
            location: {
                meetupLocation: {
                    type: 'Point',
                    coordinates: [0, 0],
                    address: "San Juan"
                },
                dropoffLocation: {
                    type: 'Point',
                    coordinates: [0, 0]
                }
            }
        } as IAppointmentModel)

        await newAppointment.save()
        expect(newAppointment.isNew).toBe(false)

        newAppointment.location.dropoffLocation.coordinates = [1, 0]

        await newAppointment.save()
        expect([...newAppointment.location.dropoffLocation.coordinates]).toEqual([1,0])
    
    })




})