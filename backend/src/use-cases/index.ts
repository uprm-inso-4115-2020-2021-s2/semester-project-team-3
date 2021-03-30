import makeClientLoginUseCase from './client-login'

// dependancy injection
import { ClientRepository } from '../persistence'
import { CarListingRepository } from '../persistence'
import { AppointmentRepository } from '../persistence'
import makeCreateCarListingUseCase from './create-car-listing'
import { makeRequestAppointment } from './request-appointment'

import { AppointmentRequest } from './declarations'

const clientRepo = new ClientRepository()
const carListingRepo = new CarListingRepository()
const appointmentRepo = new AppointmentRepository()

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