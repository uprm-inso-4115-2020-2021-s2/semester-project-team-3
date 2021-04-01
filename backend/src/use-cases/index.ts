import makeClientLoginUseCase from './client-login'

// dependancy injection
import { clientRepo, carListingRepo, appointmentRepo } from '../persistence'
import makeCreateCarListingUseCase from './create-car-listing'
import { makeRequestAppointment } from './request-appointment'
import makeGetMyListingsUseCase from './get-my-listings'
import { AppointmentRequest } from './declarations'


const clientLoginUseCase = makeClientLoginUseCase(clientRepo)
const createCarListingUseCase = makeCreateCarListingUseCase(carListingRepo)
const requestAppointmentUseCase = makeRequestAppointment(appointmentRepo, clientRepo, carListingRepo)
const getMyListingUseCase = makeGetMyListingsUseCase(carListingRepo, clientRepo)

export {
    clientLoginUseCase,
    createCarListingUseCase,
    requestAppointmentUseCase,
    getMyListingUseCase
}

export type {
    AppointmentRequest
}