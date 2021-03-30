import * as dbHandler from '../../inmemory-dbconfig'
import { ClientModel, IClientModel } from '../clientmodel';
import { AppointmentCollectionName, AppointmentModel, IAppointmentModel } from '../appointmentmodel'
import { makeValidCarListingModelSample } from './helper';


/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

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

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe("The appointment model represents an appointment in the database", () => {

    it("should be created and persisted correctly and shoul be able to be updated", async ()=> {
        const person = await ClientModel.findOne({email:"test@test.com"}).exec()
        
        const carListing = makeValidCarListingModelSample(person!._id)
        
        await carListing.save()

        const newAppointment = new AppointmentModel({
            rentee: person!._id,
            status: "Testing",
            carListing: carListing!._id,
            dateInformation: {
                appointmentDate: new Date(),
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
        } as IAppointmentModel)

        console.log(newAppointment.toJSON())
        await newAppointment.save()
        expect(newAppointment.isNew).toBe(false)

        newAppointment.location.dropoffLocation.coordinates = [1, 0]

        await newAppointment.save()
        expect([...newAppointment.location.dropoffLocation.coordinates]).toEqual([1,0])
    
    })




})