import  ClientRepository  from './repository-implementations/client-repository'
import CarListingRepository from './repository-implementations/carlisting-repository'
import AppointmentRepository from './repository-implementations/appointment-repository'
import * as dbConfig from './inmemory-dbconfig'

const clientRepo = new ClientRepository()
const carListingRepo = new CarListingRepository()
const appointmentRepo = new AppointmentRepository()

export {
    AppointmentRepository,
    ClientRepository,
    CarListingRepository,
    dbConfig,
    clientRepo,
    carListingRepo,
    appointmentRepo
}