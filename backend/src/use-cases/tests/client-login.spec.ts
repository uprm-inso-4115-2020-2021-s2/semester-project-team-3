import { ClientRepository } from '../../persistence'
import makeClientLoginUseCase from '../client/client-login'
import { dbConfig } from '../../persistence'
import {MongoMemoryServer} from 'mongodb-memory-server'
/**
 * Connect to a new in-memory database before running any tests.
 */
let mongod:MongoMemoryServer;

beforeAll(async () => {
    mongod = new MongoMemoryServer()
    await dbConfig.connect(await mongod.getUri())
});




/**
 * Remove and close the db and server.
 */
afterAll(async () =>{ 
    await dbConfig.closeDatabase()
    await mongod.stop()
});


describe(" A client should be able to login. If a client does not exist, it should be created ", () => {

    it("should persist a new object if the client does not exist", async ()=> {

        const clientRepo = new ClientRepository()
        const clientLoginUseCase = makeClientLoginUseCase(clientRepo)

        const result = await clientLoginUseCase({
            name: "Hello"
        })

        expect(result.success).toBeFalsy()

        const result2 = await clientLoginUseCase({
            email: "test@gmail.com",
            name: "test"
        })

        expect(result2.success).toBeTruthy()

        const refetched = await clientRepo.findByEmail("test@gmail.com")

        expect(refetched).toBeTruthy()
        expect(refetched!.email).toEqual(result2.data!.email)

    })

    it("should return the old object if the client exists", async ()=> {
        
        const clientRepo = new ClientRepository()
        const clientLoginUseCase = makeClientLoginUseCase(clientRepo)

        const result = await clientLoginUseCase({
            email: "test@gmail.com",
            name: "test"
        })

        expect(result.success).toBeTruthy()
        expect(result.data!.email).toEqual("test@gmail.com")

    })

})