import { CarListingModel, ICarListingModel } from '../carlistingmodel'
import * as dbHandler from '../../dbconfig'
import { ClientModel, IClientModel } from '../clientmodel';
import {makeValidCarListingModelSample} from './helper'
import { MongoMemoryServer } from 'mongodb-memory-server';



let mongod:MongoMemoryServer
beforeAll(async () => {
    mongod = new MongoMemoryServer()
    await dbHandler.connect(await mongod.getUri())
});

/**
 * Remove and close the db and server.
 */
afterAll(async () =>{ 
    await dbHandler.closeDatabase()
    await mongod.stop()
});
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





describe(" CarListingModel represents a CarListing Domain entity persisted in the database ", function (){

    it("should be created and persisted correctly", async ()=> {

        const person = await ClientModel.findOne({email:"test@test.com"}).exec()

        const carListing = makeValidCarListingModelSample(person!._id)

        await carListing.save()

        expect(carListing._id).toBeTruthy()

        expect(carListing.isNew).toBeFalsy()

    })

    it("should be updated correctly", async ()=> {

        const person = await ClientModel.findOne({email:"test@test.com"}).exec()

        const carListing = makeValidCarListingModelSample(person!._id)

        await carListing.save()

        carListing.licensePlate = "Test123"

        await carListing.save()

        const refetched = await CarListingModel.findOne({licensePlate:"Test123"}).exec()

        expect(refetched!.licensePlate).toBe("Test123")

    })

})