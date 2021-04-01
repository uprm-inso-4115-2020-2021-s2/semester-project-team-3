import {CarListingQueryFields, IClient} from '../domain'
import {Request} from 'express'
import { AppointmentRequest } from '../use-cases'

interface RequestWithUser extends Request {
    user: IClient
}

interface RequestAppointmentRequest extends RequestWithUser {
    body: AppointmentRequest,

}

interface GetMyListingsRequest extends RequestWithUser {
    body: CarListingQueryFields
}

export type {
    RequestWithUser,
    RequestAppointmentRequest,
    GetMyListingsRequest
}