
import { ClientModel, IClientModel } from '../../models/clientmodel'
import * as dbHandler from '../../dbconfig'

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());


describe(" The Client Model represents a model of an IClient in the database ", () => {

    it("should be able to be created and persisted correctly", async () => {
        const testUser = new ClientModel(
            {
                name: "Test", 
                email: "kenneth@gmail.com", 
                cellNumber: "7875000055", 
                dateOfBirth: new Date("1998-07-12")
            } as Partial<IClientModel> )

        testUser.save(function(err, doc){
            expect(err).toBeNull()
            expect(doc.email).toBe("kenneth@gmail.com")
        })
    });

    it("should not be able to be created if email is not present", async () => {
        
        const testUser = new ClientModel(
            {
                name: "Test", 
                cellNumber: "7875000055", 
                dateOfBirth: new Date("1998-07-12")
            } as Partial<IClientModel> )

        testUser
        .save(function(err, doc) {
            expect(err).toBeTruthy()
            expect(doc).toBeFalsy()
        })

    });

    it("should not be able to be created if person already exists", async () => {
        
        const testUser = new ClientModel(
            {
                name: "Test",
                email: "kenneth@gmail.com", 
                cellNumber: "7875000055", 
                dateOfBirth: new Date("1998-07-12")
            } as Partial<IClientModel> )

        await testUser.save()

        const newUser = new ClientModel({
            email:"kenneth.rosario@gmail.com",
            name: "Dimelo",
            cellNumber: "7875000055", 
            dateOfBirth: new Date("1998-07-12")
        })

        await newUser.save()
        
        const refetched = (await ClientModel.findOne({email:"kenneth@gmail.com"}))!
        
        expect(refetched.name).toBe("Test")

    });
    
    it("should be able to be updated", async () => {

        const newUser = new ClientModel(
        {
            name: "Test",
            email: "kenneth@gmail.com", 
            cellNumber: "7875000055", 
            dateOfBirth: new Date("1998-07-12")
        } as Partial<IClientModel> )

        await newUser.save()


        newUser.name = "Kevin"
        await newUser.save()
        
        expect(newUser.name).toBe("Kevin")
        
    })

    it("should be able to be updated after being queried", async () => {

        const newUser = new ClientModel(
            {
                name: "Test",
                email: "kenneth@gmail.com", 
                cellNumber: "7875000055", 
                dateOfBirth: new Date("1998-07-12")
            } as Partial<IClientModel> )
    
        await newUser.save()

        const doc = (await ClientModel.findOne({email:"kenneth@gmail.com"}))!
        
        doc.name = "Kevin"
        await doc.save()

        const refetched = (await ClientModel.findOne({email:"kenneth@gmail.com"}))!

        expect(refetched.name).toBe("Kevin")

    })

})