import { dbConfig, CarListingRepository } from '../../persistence'
import makeCreateCarListingUseCase from '../create-car-listing'

let carListingRepo = new CarListingRepository()
let createCarListingUseCase = makeCreateCarListingUseCase(carListingRepo)

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbConfig.connect());
/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbConfig.closeDatabase());

describe("A client should be able to create a new car listing for others to see", () => {

})