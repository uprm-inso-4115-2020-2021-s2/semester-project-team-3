import * as dbHandler from '../../inmemory-dbconfig'
import { ClientModel, IClientModel } from '../clientmodel';
import { AppointmentModel, IAppointmentModel } from '../appointmentmodel'
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
            days: 4,
            rentee: person,
            dateAccepted: null,
            appointmentDate: new Date(),
            status: "Pending",
            carListing: carListing,
            meetupLocation:"test",
            dropoffLocation:"test"
        } as IAppointmentModel)


        await newAppointment.save()
        expect(newAppointment.isNew).toBe(false)

        newAppointment.meetupLocation = "dimelo"
        newAppointment.dropoffLocation = "2"

        await newAppointment.save()

        expect(newAppointment.meetupLocation).toBe("dimelo")
        expect(newAppointment.dropoffLocation).toBe("2")

    })
    

})