import makeGetMyListingsUseCase from '../car-listing/get-my-listings'
import {clientRepo, carListingRepo, dbConfig} from '../../persistence'
import { ICarListing, IClient, makeCarListing, makeClient } from '../../domain'

let Person: IClient | null
beforeAll(async () => {
    await dbConfig.connect()
    Person = await clientRepo.createClient(
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
describe(`The get my listing use case represents the 
        use case where the client needs to fetch his listings`, () => {
    
    let getMyListingUseCase = makeGetMyListingsUseCase(carListingRepo, clientRepo)
    it("Should not succeed if client does not exist", async ()=> {

        const result = await getMyListingUseCase({owner: "test"})
        expect(result.success).toBeFalsy()

    })

    it("Should succed if client exist and show only the listings of the client", async () => {

        let sampleCarListing = () => ({
            "model": "Corolla",
            "brand": "Toyota",
            "year": 2020,
            "cancellationFee":25.56,
            "licensePlate": "TES321",
            "priceRate": 35,
            "carDescription": " Testing creating a vehicle ",
            "carImages": [""] ,
            "carLocation": {lat:0, lon:0, address:""}
        })

        let lis: Partial<ICarListing> = sampleCarListing()
        lis.owner = Person! 
        const listing1 = await carListingRepo.createCarListing(
            sampleCarListing(),
            Person!.email
        )

        let person2 = await clientRepo.createClient(
        makeClient({
            name: "Hola",
            email:"Hola@hola.com"
        }))

        lis.licensePlate = "111111"
        lis.owner = person2!
        const listing2 = await carListingRepo.createCarListing(
            lis,
            lis.owner?.email
        )

        const result = await getMyListingUseCase({
            owner: person2!.email
        })

        expect(result).toBeTruthy()
        expect(result.data!.length).toEqual(1)
        expect(result.data![0].licensePlate).toEqual('111111')

    })

})

