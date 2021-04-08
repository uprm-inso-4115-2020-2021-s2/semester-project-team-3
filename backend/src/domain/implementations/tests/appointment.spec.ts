import { Appointment } from '../appointment'
import { AppointmentStatusType, IAppointment } from '../../declarations'
import { Client } from '../client'
import { CarListing } from '../carlisting'

describe('The Appointment class models the appointment entity in the domain', () => {

    it("should be able to create an appointment sucessfully", async () => {
        const client = new Client(
            {
                name: "Lola Rodz",
                email:"lola@gmail.com",
                dateOfBirth: new Date(),
                cellNumber: "787-355-7783"
            }
        ) 
        const car = new CarListing(
            {
                model: "corolla",
                isVerified: false,
                brand: "toyota",
                year: 2020,
                cancellationFee: 50,
                licensePlate: "LOL990",
                priceRate: 33,
                owner: client,
                canDeliver: false,
                carLicenseImage: " ",
                carDescription: "Comfortable & brand new car",
                carImages: [],
                carLocation: {lat: 0, lon: 0, address:""}
            } 
        )

        const app = new Appointment(
            {
                dateInformation: {
                    appointmentDate: new Date(),
                    days: 10
                },
                location: {
                    dropoffLocation: {lat:0, lon:0},
                    meetupLocation: {lat:0, lon:0}
                },
                carListing: car,
                rentee: client,
                status: AppointmentStatusType.Accepted,
                postAcceptInformation:{
                    dateAccepted: new Date(),
                    transactions: []
                }
            })

            expect(app.dateInformation.days).toBe(10)
            expect(app.rentee).toBe(client)
            expect(app.dateInformation.appointmentDate).toBeDefined()
            expect(app.status).toBe(AppointmentStatusType.Accepted)
            expect(app.carListing).toBeDefined()
            expect(app.location.meetupLocation).toEqual({lat:0, lon:0})
            expect(app.location.dropoffLocation).toEqual({lat:0, lon:0})
            expect(app.postAcceptInformation!.dateAccepted).toBeDefined()
            expect(app.postAcceptInformation!.transactions).toBeDefined()
        });


    it("should give an error when all the required fields are not complete", async () => {
        const client = new Client(
        {
            name: "Lola Rodz",
            email:"lola@gmail.com",
            dateOfBirth: new Date(),
            cellNumber: "787-355-7783"
        })
        

        const app = () => new Appointment(
            {
                rentee: client,
                location: {
                    meetupLocation: {lat: 0, lon: 0},
                    dropoffLocation: {lat:0, lon:0}
                }
            });

        expect(app).toThrowError()
    
    });

    it("should not give an error when a non required field is not complete", async () => {
        const client = new Client(
            {
                name: "Lola Rodz",
                email:"lola@gmail.com",
                dateOfBirth: new Date(),
                cellNumber: "787-355-7783"
            }
        )
        
        const car = new CarListing(
            {
                model: "corolla",
                isVerified: false,
                brand: "toyota",
                year: 2020,
                cancellationFee: 50,
                licensePlate: "LOL990",
                priceRate: 33,
                owner: client,
                canDeliver: false,
                carLicenseImage: " ",
                carDescription: "Comfortable & brand new car",
                carImages: [],
                carLocation: {lat: 0, lon: 0, address:""}
            } 
        )
        
        const app = new Appointment(
            {
                dateInformation: {
                    appointmentDate: new Date(),
                    days: 10
                },
                location: {
                    dropoffLocation: {lat:0, lon:0},
                    meetupLocation: {lat:0, lon:0}
                },
                carListing: car,
                rentee: client,
            })

            expect(app.dateInformation.days).toBe(10)
            expect(app.rentee).toBe(client)
            expect(app.dateInformation.appointmentDate).toBeDefined()
            expect(app.status).toBe("Pending")
            expect(app.carListing).toBeDefined()
            expect(app.location.meetupLocation).toEqual({lat:0, lon:0})
            expect(app.location.dropoffLocation).toEqual({lat:0, lon:0})
            
    });

    it("should give an error when status is accepted and no postAccept info is given", async ()=>{
        const client = new Client(
            {
                name: "Lola Rodz",
                email:"lola@gmail.com",
                dateOfBirth: new Date(),
                cellNumber: "787-355-7783"
            }
        )
        
        const car = new CarListing(
            {
                model: "corolla",
                isVerified: false,
                brand: "toyota",
                year: 2020,
                cancellationFee: 50,
                licensePlate: "LOL990",
                priceRate: 33,
                owner: client,
                canDeliver: false,
                carLicenseImage: " ",
                carDescription: "Comfortable & brand new car",
                carImages: [],
                carLocation: {lat: 0, lon: 0, address:""}
            } 
        )
        
        const app = () => new Appointment(
            {
                dateInformation: {
                    appointmentDate: new Date(),
                    days: 10
                },
                location: {
                    dropoffLocation: {lat:0, lon:0},
                    meetupLocation: {lat:0, lon:0}
                },
                carListing: car,
                rentee: client,
                status: AppointmentStatusType.Accepted
            });
        
        
        expect(app).toThrowError()

    })

});