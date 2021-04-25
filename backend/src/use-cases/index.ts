import makeClientLoginUseCase from './client/client-login'

// dependancy injection
import { clientRepo, carListingRepo, appointmentRepo } from '../persistence'
import makeCreateCarListingUseCase from './car-listing/create-car-listing'
import { makeRequestAppointment } from './appointment/request-appointment'
import makeGetMyListingsUseCase from './car-listing/get-my-listings'
import { AppointmentRequest, File, IStorageAdapter, GetAppointmentRequest } from './declarations'
import makeSearchListing from './car-listing/search-listing'
import makeUploadCarImage from './car-listing/upload-car-images'
import { storageAdapter } from '../adapters'
import { CreateCarListingRequest } from './declarations'
import { makeGetMyAppointments } from './appointment/get-appointments'


const clientLoginUseCase = makeClientLoginUseCase(clientRepo)
const createCarListingUseCase = makeCreateCarListingUseCase(carListingRepo, clientRepo, storageAdapter)
const requestAppointmentUseCase = makeRequestAppointment(appointmentRepo, clientRepo, carListingRepo)
const getMyAppointmentUseCase = makeGetMyAppointments(carListingRepo, appointmentRepo, clientRepo)
const getMyListingUseCase = makeGetMyListingsUseCase(carListingRepo, clientRepo)
const searchListingUseCase = makeSearchListing(carListingRepo)
const uploadCarImageUseCase = makeUploadCarImage(carListingRepo, clientRepo, storageAdapter)

export {
    clientLoginUseCase,
    createCarListingUseCase,
    requestAppointmentUseCase,
    getMyListingUseCase,
    searchListingUseCase,
    uploadCarImageUseCase,
    getMyAppointmentUseCase
}

export type {
    AppointmentRequest,
    File,
    IStorageAdapter,
    CreateCarListingRequest,
    GetAppointmentRequest
}