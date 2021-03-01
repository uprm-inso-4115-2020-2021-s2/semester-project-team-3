import makeClientLoginUseCase from './client-login'

// dependancy injection
import { ClientRepository } from '../persistence'

const clientLoginUseCase = makeClientLoginUseCase(new ClientRepository())

export {
    clientLoginUseCase
}