import makeClientLoginUseCase from './client-login'

// dependancy injection
import { ClientRepository } from '../persistence'
import { CarListingRepository } from '../persistence'
import makeCreateCarListingUseCase from './create-car-listing'

const clientLoginUseCase = makeClientLoginUseCase(new ClientRepository())
const createCarListingUseCase = makeCreateCarListingUseCase(new CarListingRepository())

export {
    clientLoginUseCase,
    createCarListingUseCase
}