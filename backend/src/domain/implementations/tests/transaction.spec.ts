import { Transaction } from '../transaction'
import { ITransaction } from '../../declarations'
import { Client } from '../client'

describe('The Transaction class creates a transaction in the db', () => {

    it("should be able to create a transaction sucessfully", async () => {
        const client = new Client(
            {
                name: "Lola Rodz",
                email:"lola@gmail.com",
                dateOfBirth: new Date(),
                cellNumber: "787-355-7783"
            }
        )

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
        const client = new Client(
        {
            name: "Lola Rodz",
            email:"lola@gmail.com",
            dateOfBirth: new Date(),
            cellNumber: "787-355-7783"
        }
    )

        const trans = ()=> new Transaction(
            {
                transactionNumber: 1,
                total: 500,
                description: "SecurityDeposit",
                issuer: client,
                status: "Pending"

            } as Partial<ITransaction> );
            
            expect(trans).toThrowError()
 
    });

});