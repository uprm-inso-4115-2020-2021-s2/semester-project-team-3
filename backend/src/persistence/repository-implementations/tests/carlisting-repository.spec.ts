import CarListingRepository from '../carlisting-repository'
import * as dbHandler from '../../dbconfig'
import { ClientModel, IClientModel, CarListingModel, ICarListingModel } from '../../models';
import { makeValidCarListingModelSample } from '../../models/tests/helper'
import { MongoMemoryServer } from 'mongodb-memory-server';

/**
 * Connect to a new in-memory database before running any tests.
 */
let person: IClientModel;
let sampleCarListing: ICarListingModel;

let mongod:MongoMemoryServer;

beforeAll(async () => {
    mongod = new MongoMemoryServer()
    await dbHandler.connect(await mongod.getUri())
    person = new ClientModel({
        email:"test@test.com",
        name:"Pedro",
        dateOfBirth: new Date("2000-02-10"),
        isVerified: false,
        cellNumber:"7875550000"
    } as IClientModel)
    
    await person.save()
    
    sampleCarListing = makeValidCarListingModelSample(person._id)
    await sampleCarListing.save()
});




/**
 * Remove and close the db and server.
 */
afterAll(async () =>{ 
    await dbHandler.closeDatabase()
    await mongod.stop()
});


const carListingRepo = new CarListingRepository()

describe(`
    The Car Listing repository is in charge of persisting 
    ICarLisiting instances to the db
    and abstracting the db from the domain
`, () => {

    it("should be able to fetch by license plate", async () => {

        const fetched = await carListingRepo.findByLicensePlate(sampleCarListing.licensePlate)

        expect(fetched).toBeTruthy()

        expect(fetched!.licensePlate).toEqual(sampleCarListing.licensePlate)

        expect(fetched!.owner).toBeTruthy()

        expect(fetched!.owner!.email).toEqual(person.email)

    })

    it("should query by owner", async () => {

        const fetchedList = await carListingRepo.findByOwner(person.email)

        expect(fetchedList.length).toEqual(1)
        
        expect(fetchedList[0].owner.email).toEqual(person.email)


        const refetched = await carListingRepo.findByOwner("e")

        expect(refetched.length).toEqual(0)

        const fetchWithPage = await carListingRepo.findByOwner(person.email, 10)

        expect(fetchWithPage.length).toEqual(0)

    })

    it ("should create new carListing", async () => {

        const newVehicle = {
            title: "testing",
            brand: "Toyota",
            model: "Corolla",
            year: 2021,
            cancellationFee: 30.20,
            licensePlate: "DIMELO",
            priceRate: 35,
            carDescription: " Testing ",
            carImages: [],
            carLocation: {lat:0, lon:0}
        }

        const newListing = await carListingRepo.createCarListing(newVehicle, person.email)

        expect(newListing).toBeTruthy()

        expect(newListing!.licensePlate).toEqual(newVehicle.licensePlate)

        expect(newListing!.carDescription).toEqual(newVehicle.carDescription)

        const refetched = await carListingRepo.findByLicensePlate(newVehicle.licensePlate)

        expect(refetched).toBeTruthy()

        expect(refetched).toEqual(newListing)

        expect(refetched!.owner).toEqual(newListing!.owner)

        const shouldFail = await carListingRepo.createCarListing({...newVehicle, licensePlate:"CHA123"}, "testingagain@gmail.com")

        expect(shouldFail).toBeFalsy()

    })

    it(" should be able to update an existing carListing ", async ()=> {
        
        const updated = await carListingRepo.updateCarListing(sampleCarListing.licensePlate, { brand: "Honda", model: "Civic", year: 2000, carLocation:{lat:10, lon:10, address:"San Juan"}})

        expect(updated).toBeTruthy()

        const secureUpdated = updated!

        expect(secureUpdated.licensePlate).toEqual(sampleCarListing.licensePlate)

        expect(secureUpdated.model).toEqual("Civic")

        expect(secureUpdated.year).toEqual(2000)

        expect(secureUpdated.brand).toEqual("Honda")

        expect(secureUpdated.licensePlate).toEqual(sampleCarListing.licensePlate)

        const shouldFail = await carListingRepo.updateCarListing("123456", {})

        expect(shouldFail).toBeNull()

    })

    
    it(" should be searchable by license plate", async ()=> {
        const searchByFields = await carListingRepo.findAllByFields({
            licensePlate: sampleCarListing.licensePlate
        })
        expect(searchByFields.length).toBeGreaterThan(0)
    })

    it (" should be searchable by owner ", async () => {
        const searchByFields = await carListingRepo.findAllByFields({
            owner: person.email
        })
        expect(searchByFields.length).toBeGreaterThan(0)
    })

    it(" should be searchable by other misc fields ", async ()=> {
        const searchByFields = await carListingRepo.findAllByFields({
 
            carModel: 'Civic',
            brand: 'Honda',
            canDeliver: false

        })
        expect(searchByFields.length).toBeGreaterThan(0)
    })

    it( "should be searchable by distance ", async () => {

        
        const searchByFields = await carListingRepo.findAllByFields({
            
            brand: "Honda",

            nearLocation: {
                location: {
                    lat:0, lon:0
                }
            }

        })

        console.log(JSON.stringify(searchByFields))
        expect(searchByFields.length).toBeGreaterThan(0)

    })    

})