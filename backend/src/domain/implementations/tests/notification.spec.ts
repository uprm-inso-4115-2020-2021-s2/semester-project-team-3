import { Notification } from '../notification'
import { INotification } from '../../declarations'
import { Client } from '../client'

describe('The Notification class models the notification entity in the domain', () => {

    it("should be able to create a notification sucessfully", async () => {
        const client = new Client(
            {
                name: "Lola Rodz",
                email:"lola@gmail.com",
                dateOfBirth: new Date(),
                cellNumber: "787-355-7783"
            }
        )

        const notification = new Notification(
            {
                client: client,
                message: " ",
                priority: "NonUrgent"

            } as Partial<INotification> )

            expect(notification.client).toBeDefined
            expect(notification.message).toBe(" ")
            expect(notification.priority).toBe("NonUrgent")
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

        const notification = () => new Notification(
            {
                client: client,
                message: " "

            } as Partial<INotification> )

            expect(notification).toThrowError
    
    });

});