import { makeClient } from '../../domain'
import { dbConfig, CarListingRepository, ClientRepository } from '../../persistence'
import makeCreateCarListingUseCase from '../car-listing/create-car-listing'
import {MockStorageAdapter} from './mock/mockStorageAdapter'

let carListingRepo = new CarListingRepository()
let clientRepo = new ClientRepository()
let createCarListingUseCase = makeCreateCarListingUseCase(carListingRepo, clientRepo, new MockStorageAdapter())

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbConfig.connect()
    await clientRepo.createClient(
        makeClient({
            email:"test@test.com",
            name:"pedro"
        })
    )
});
/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbConfig.closeDatabase());

describe("A client should be able to create a new car listing for others to see", () => {

    let sampleCarListing = () => ({
        "title": "testing",
        "model": "Corolla",
        "brand": "Toyota",
        "year": 2020,
        "cancellationFee":25.56,
        "licensePlate": "TES321",
        "priceRate": 35,
        "carDescription": " Testing creating a vehicle ",
        "carImages": [] ,
        "carLocation": {lat:0, lon:0, address:""}
    })

    it("Should be able to create new carListing given a sample carListing", async () => {
        let sample = sampleCarListing()
        const result = await createCarListingUseCase({
            ...sample,
            carLocationAddress: sample.carLocation.address,
            carLocationLat: sample.carLocation.lat,
            carLocationLon: sample.carLocation.lon,
            canDeliver: false,
            owner: "test@test.com"
        })
        expect(result.success).toBeTruthy()
        expect(result.data).toBeTruthy()
        expect(result.data!.licensePlate).toEqual(sample.licensePlate)
    })

    it("Should not allow to create another lsiting with the same license plate", async () => {
        let sample = sampleCarListing()
        const result = await createCarListingUseCase({
            ...sample,
            carLocationAddress: sample.carLocation.address,
            carLocationLat: sample.carLocation.lat,
            carLocationLon: sample.carLocation.lon,
            canDeliver: false,
            owner: "test@test.com"
        })
        expect(result.success).toBeFalsy()
        expect(result.data).toBeFalsy()
    })

})