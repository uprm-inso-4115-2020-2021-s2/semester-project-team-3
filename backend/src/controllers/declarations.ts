import {IClient} from '../domain'
import {Request} from 'express'

interface RequestWithUser extends Request {
    user: IClient
}

export type {
    RequestWithUser
}