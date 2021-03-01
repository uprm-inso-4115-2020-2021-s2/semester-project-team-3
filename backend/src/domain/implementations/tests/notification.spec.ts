import * as dbHandler from './inmemory-dbconfig'
import { Notification } from '../notification'
import { INotification } from '../../declarations'
import { Client } from '../client'

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('The Notification class creates a notification in the db', () => {

    it("should be able to create a notification sucessfully", async () => {
        const client = new Client()

        const notification = new Notification(
            {
                client: client,
                message: " ",
                priority: "NonUrgent"

            } as Partial<INotification> )

           

        });


    it("should give an error when all the required fields are not complete", async () => {
        const client = new Client()

        const notification = new Notification(
            {
                client: client,
                message: " "

            } as Partial<INotification> )

            expect(notification).toBeUndefined
    
    });

});