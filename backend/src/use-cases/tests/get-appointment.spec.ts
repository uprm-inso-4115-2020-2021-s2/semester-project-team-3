import { MongoMemoryServer } from "mongodb-memory-server";
import { IAppointment, ICarListing, IClient, makeCarListing, makeClient } from "../../domain";
import { appointmentRepo, CarListingRepository, ClientRepository, dbConfig } from "../../persistence";
import {makeGetMyAppointments} from '../appointment/get-appointments'

let carListingRepo = new CarListingRepository()
let clientRepo = new ClientRepository()
let useCase = makeGetMyAppointments(carListingRepo, appointmentRepo, clientRepo)
let client1:IClient;
let client2:IClient;
let carListing1: ICarListing
let appointment1: IAppointment
let mongod:MongoMemoryServer;

beforeAll(async () => {
    mongod = new MongoMemoryServer()
    await dbConfig.connect(await mongod.getUri())
    client1 = await clientRepo.createClient(
        makeClient({
            email:"test@test.com",
            name:"pedro"
        })
    ) as IClient
    client2 = await clientRepo.createClient(
        makeClient({
            email:"test2@test.com",
            name:"samuel"
        })
    ) as IClient
    carListing1 = await carListingRepo.createCarListing(
        makeCarListing({
            licensePlate: "TEST00",
            carLocation: {
                lat:0,
                lon:0
            },
            carDescription:"Beutiful Car near you",
            owner: client2,
            title: "Get your car today",
            model: "Civic",
            brand: "Honda",
            priceRate: 50,
            year: 2020,
            cancellationFee: 1
        }), client2.email
    ) as ICarListing

    appointment1 = client1.request({
        listing: carListing1,
        meetupLocation: {
            lat: 0,
            lon: 0
        },
        dropoffLocation: {
            lat: 0,
            lon: 0
        },
        date: new Date(),
        days: 3
    }) as IAppointment

    appointment1 = (await appointmentRepo.createAppointment(appointment1)) as IAppointment
});


/**
 * Remove and close the db and server.
 */
afterAll(async () =>{ 
    await dbConfig.closeDatabase()
    await mongod.stop()
});

describe("you should be able to get your appointments", () => {

    it("Should get all your appointments", async ()=>{
        const appointments = (await  useCase({listingLicensePlate: "TEST00", owner:client2.email, page:1}))!
        expect(appointments.success).toBeTruthy()
        expect(appointments.data?.length).toBeGreaterThan(0)
    })

})

