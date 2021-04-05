import makeClientLoginUseCase from './client/client-login'

// dependancy injection
import { clientRepo, carListingRepo, appointmentRepo } from '../persistence'
import makeCreateCarListingUseCase from './car-listing/create-car-listing'
import { makeRequestAppointment } from './appointment/request-appointment'
import makeGetMyListingsUseCase from './car-listing/get-my-listings'
import { AppointmentRequest, File } from './declarations'
import makeSearchListing from './car-listing/search-listing'
import makeUploadCarImage from './car-listing/upload-car-images'


const clientLoginUseCase = makeClientLoginUseCase(clientRepo)
const createCarListingUseCase = makeCreateCarListingUseCase(carListingRepo)
const requestAppointmentUseCase = makeRequestAppointment(appointmentRepo, clientRepo, carListingRepo)
const getMyListingUseCase = makeGetMyListingsUseCase(carListingRepo, clientRepo)
const searchListingUseCase = makeSearchListing(carListingRepo)
const uploadCarImageUseCase = makeUploadCarImage(carListingRepo, clientRepo)

export {
    clientLoginUseCase,
    createCarListingUseCase,
    requestAppointmentUseCase,
    getMyListingUseCase,
    searchListingUseCase,
    uploadCarImageUseCase
}

export type {
    AppointmentRequest,
    File
}