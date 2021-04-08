import {handleLogin, fetchUser} from '../helpers'

import { dbConfig, ClientRepository } from '../../persistence'
import { IClient } from '../../domain';

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbConfig.connect());
/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbConfig.closeDatabase());


describe(`
The handleLogin function is in charge of parsing the 
incoming oauth profile into a client object and 
calling the appropiate domain application useCase
`, () => {
    jest.mock('../../use-cases')

    const clientRepo = new ClientRepository()
    it("should create a client if it does note exist", async () => {

        await handleLogin("", "", {
            emails: [{value: "test@test.com"}],
            displayName: "kenneth",
            provider: "test",
            id: "123",
            _json:{picture:"test123"}
        }, (err, user:IClient, msg) => {
            expect(user).toBeTruthy()
            expect(user.email).toEqual("test@test.com")
            expect(user.name).toEqual("kenneth")
            expect(user.image).toEqual("test123")
        } )

        const fetched = await clientRepo.findByEmail("test@test.com")
        expect(fetched).toBeTruthy()

    })

    it("should not give error if user already exists", async () => {
        await handleLogin("", "", {
            emails: [{value: "test@test.com"}],
            displayName: "kenneth",
            provider: "test",
            id: "123",
            _json:{picture:"test123"}
        }, (err, user:IClient, msg) => {
            expect(err).toBeFalsy()
            expect(user).toBeTruthy()
            expect(user.email).toEqual("test@test.com")
            expect(user.name).toEqual("kenneth")
            expect(user.image).toEqual("test123")
        } )

        const fetched = await clientRepo.findByEmail("test@test.com")
        expect(fetched).toBeTruthy()
    })

})

describe("The fetchUser function queries the target user and returns a dto back", ()=> {

    it("should fetch user", async ()=> {
        await fetchUser({sub: "test@test.com"}, (err, user: IClient, msg) => {
            expect(err).toBeFalsy()
            expect(user).toBeTruthy()
            expect(user!.email).toEqual("test@test.com")
        })
    })
    it("should give an error if user does not exist", async () => {
        await fetchUser({sub: "test@te"}, (err, user: IClient, msg) => {
            expect(err).toBeTruthy()
            expect(user).toBeFalsy()
        })
    })

})