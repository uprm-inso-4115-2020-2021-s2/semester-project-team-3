import * as dbHandler from './inmemory-dbconfig'
import { Transaction } from '../transaction'
import { ITransaction } from '../../declarations'
import { Client } from '../client'


/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('The Transaction class creates a transaction in the db', () => {

    it("should be able to create a transaction sucessfully", async () => {
        const client = new Client()

        const trans = new Transaction(
            {
                transactionNumber: 1,
                total: 500,
                description: "SecurityDeposit",
                date: new Date(),
                issuer: client,
                receiver: client,
                status: "Pending"
            } as Partial<ITransaction> )

            expect(trans.transactionNumber).toBe(1)
            expect(trans.total).toBe(500)
            expect(trans.description).toBe("SecurityDeposit")
            expect(trans.date).toBeDefined
            expect(trans.issuer).toBeDefined
            expect(trans.receiver).toBeDefined
            expect(trans.status).toBe("Pending")

    });

    it("should give an error when all the required fields are not complete", async () => {
        const client = new Client()

        const trans = new Transaction(
            {
                transactionNumber: 1,
                total: 500,
                description: "SecurityDeposit",
                issuer: client,
                status: "Pending"

            } as Partial<ITransaction> )

            expect(trans).toBeUndefined
    
    });

});