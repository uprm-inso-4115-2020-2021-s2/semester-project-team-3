import {makeRequestAppointment} from '../appointment/request-appointment'
import {makeClient, makeAppointment, makeCarListing, IClient, ICarListing, IAppointment, AppointmentStatusType} from '../../domain'
import {clientRepo, appointmentRepo, carListingRepo} from '../../persistence'
import { dbConfig } from '../../persistence'
import { ErrorMessages } from '../declarations';



let requestAppointmentUseCase = makeRequestAppointment(appointmentRepo, clientRepo, carListingRepo);
let client1: IClient;
let client2: IClient;
let client3: IClient;
let carListing1: ICarListing;
let carListing2: ICarListing;
let carListing3: ICarListing;
let appointment1: IAppointment;
let appointment2: IAppointment;

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbConfig.connect()
    
    
    client1 = makeClient({
        name:"test1",
        email:"test1@test.com"
    })
    client2 = makeClient({
        name:"test2",
        email:"test2@test2.com"
    })
    client3 = makeClient({
        name:"test3",
        email:"test3@test3.com"
    })

    carListing1 = makeCarListing({
        title:"listing1",
        owner: client1,
        brand: "Toyota",
        model: "Corolla",
        year:  1999,
        cancellationFee: 30.54,
        licensePlate: "TEST11",
        priceRate: 33.00,
        carDescription: "Testing1",
        carLocation: {lat:0, lon:0, address:""}
    })

    carListing2 = makeCarListing({
        title:"listing2",
        owner:client2,
        brand: "Honda",
        model: "Corolla",
        year: 2010,
        cancellationFee: 45.90,
        licensePlate: "TEST22",
        priceRate: 345.67,
        carDescription: "Testing2",
        carLocation: {lat:0, lon:0, address:""}
    })

    carListing3 = makeCarListing({
        title:"listing3",
        owner: client3,
        brand: "Honda",
        model:"Civic",
        year: 2010,
        cancellationFee: 33.00,
        licensePlate: "TEST33",
        priceRate: 55.00,
        carDescription: "Testing3",
        carLocation: {lat:0, lon:0, address:""}
    })

    appointment1 = makeAppointment({
        rentee: client1,
        carListing: carListing2,
        dateInformation: {
            appointmentDate: new Date("2020-10-03"),
            days: 10
        },
        location:{
            meetupLocation: { lat:0, lon:0 },
            dropoffLocation: {lat:0, lon:0}
        },
        status: AppointmentStatusType.Accepted,
        postAcceptInformation: {
            transactions: [],
            dateAccepted: new Date("2020-09-12")
        }
    })

    appointment2 = makeAppointment({
        rentee: client2,
        carListing: carListing1,
        dateInformation: {
            appointmentDate: new Date("2019-10-10"),
            days: 30
        },
        location:{
            meetupLocation: { lat:0, lon:0 },
            dropoffLocation: {lat:0, lon:0}
        }
    })

    await clientRepo.createClient(client1)
    await clientRepo.createClient(client2)
    await carListingRepo.createCarListing(carListing1, client1.email)
    await carListingRepo.createCarListing(carListing2, client2.email)
    await appointmentRepo.createAppointment(appointment1)
    await appointmentRepo.createAppointment(appointment2)

});
/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbConfig.closeDatabase());

describe("requestAppointmentUseCase represents the use case when a rentee requests a carListing for lease", () => {

    it("Should not allow to request if listing does not exist", async ()=> {
        const result = await requestAppointmentUseCase(client1.email, {
            listingLicensePlate: carListing3.licensePlate,
            date: new Date(),
            days: 7,
            meetupLocation: {lat:0, lon:0},
            dropoffLocation: {lat: 0, lon: 0}
        })
        expect(result.success).toBeFalsy()
        expect(result.msg).toEqual(ErrorMessages.ListingDoesNotExist)
    })

    it("Should not allow to request if client does not exist", async ()=> {

        const result = await requestAppointmentUseCase(client3.email, {
            listingLicensePlate: carListing2.licensePlate,
            date: new Date(),
            days: 7,
            meetupLocation: {lat:0, lon:0},
            dropoffLocation: {lat: 0, lon: 0}
        })
        expect(result.success).toBeFalsy()
        expect(result.msg).toEqual(ErrorMessages.ClientDoesNotExist)
    })

    it("Should not allow to request if another accepted appointment overlaps with the request", async ()=> {

        
        const result2 = await requestAppointmentUseCase(client2.email, {
            listingLicensePlate: carListing2.licensePlate,
            date: new Date("2020-09-28"),
            days: 10,
            meetupLocation: {lat:0, lon:0},
            dropoffLocation: {lat: 0, lon: 0}
        })

        expect(result2.success).toBeFalsy()
        expect(result2.msg).toEqual(ErrorMessages.OverlapsError)
    })

    it("Should not allow to request if rentee owns listing", async () => {

        const result = await requestAppointmentUseCase(client1.email, {
            listingLicensePlate: carListing1.licensePlate,
            date: new Date(),
            days: 7,
            meetupLocation: {lat:0, lon:0},
            dropoffLocation: {lat: 0, lon: 0}
        })
        expect(result.success).toBeFalsy()
        expect(result.msg).toEqual(ErrorMessages.RenteeOwnsListing)
    })

    it("Should allow to request successfully even if ther is an overlapping pending request", async ()=> {

        const result = await requestAppointmentUseCase(client1.email, {
            listingLicensePlate: carListing2.licensePlate,
            date: new Date("2019-10-02"),
            days: 10,
            meetupLocation: {lat:0, lon:0},
            dropoffLocation: {lat: 0, lon: 0}
        })

        expect(result.success).toBeTruthy()
        expect(result.data).toBeDefined()

    })

    it("Should allow to request successfully even if there are accepted request but no overlapping one", async ()=> {
        
        const result = await requestAppointmentUseCase(client1.email, {
            listingLicensePlate: carListing2.licensePlate,
            date: new Date("2020-12-02"),
            days: 10,
            meetupLocation: {lat:0, lon:0},
            dropoffLocation: {lat: 0, lon: 0}
        })

        expect(result.success).toBeTruthy()
        expect(result.data).toBeDefined()

    })

})