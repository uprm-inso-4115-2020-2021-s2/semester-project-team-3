import ClientRepository from '../client-repository'
import {makeClient} from '../../../domain/factories'
import * as dbHandler from '../../inmemory-dbconfig'
import { ClientModel, IClientModel } from '../../models/clientmodel';


/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbHandler.connect()
    const person = new ClientModel({
        email:"test@test.com",
        name:"Pedro",
        dateOfBirth: new Date("2000-02-10"),
        isVerified: false,
        cellNumber:"7875550000"
    } as IClientModel)

    await person.save()
});


/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

const clientRepo = new ClientRepository()

describe(`The Client repository is in charge of persisting IClient instances to the db
    and abstracting the mongoose library from the domain
`, () => {


    it("Should be able to fetch user", async ()=>{

        const person = await clientRepo.findByEmail('test@test.com')
        expect(person).toBeTruthy()

        const notPresent = await clientRepo.findByEmail('dimelo')

        expect(notPresent).toBeNull()

    })

    it(" Should be able to create new users ", async ()=> {
        
        const newPerson = makeClient({
            email:"testing123@gmail.com",
            name:"Antonio",
            dateOfBirth: new Date(),
            cellNumber:"7878889090"
        })

        const created = await clientRepo.createClient(newPerson)
        
        expect(created).toBeTruthy()

    })


    it(" Should be updateable ", async () => {

        const person = await clientRepo.findByEmail("testing123@gmail.com")

        const updated = await clientRepo.updateClient(person!.email, {
            cellNumber: "7878880000",
            dateOfBirth: new Date('1999-03-10')
        })

        expect(updated).toBeTruthy()

        expect(updated!.cellNumber).toBe("7878880000")
        expect(updated!.dateOfBirth).toEqual(new Date('1999-03-10'))

        const refetched = await clientRepo.findByEmail("testing123@gmail.com")

        expect(refetched!.cellNumber).toBe("7878880000")
        expect(refetched!.dateOfBirth).toEqual(new Date('1999-03-10'))

    })

    it("Should not allow email to change", async ()=> {

        const person = await clientRepo.findByEmail('testing123@gmail.com')

        const updated = await clientRepo.updateClient(person!.email, {
            email:"ant@gmail.com"
        })

        expect(updated!.email).toEqual(person!.email)

    })



})