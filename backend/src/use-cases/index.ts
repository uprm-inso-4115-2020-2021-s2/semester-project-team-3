import makeClientLoginUseCase from './client-login'

// dependancy injection
import { clientRepo, carListingRepo, appointmentRepo } from '../persistence'
import makeCreateCarListingUseCase from './create-car-listing'
import { makeRequestAppointment } from './request-appointment'
import { AppointmentRequest } from './declarations'


const clientLoginUseCase = makeClientLoginUseCase(clientRepo)
const createCarListingUseCase = makeCreateCarListingUseCase(carListingRepo)
const requestAppointmentUseCase = makeRequestAppointment(appointmentRepo, clientRepo, carListingRepo)

export {
    clientLoginUseCase,
    createCarListingUseCase,
    requestAppointmentUseCase
}

export type {
    AppointmentRequest
}