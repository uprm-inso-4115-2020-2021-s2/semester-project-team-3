import {CarListingQueryFields, IClient} from '../domain'
import {Request, Express} from 'express'
import { AppointmentRequest } from '../use-cases'
import { CreateCarListingRequest } from '../use-cases/declarations'


interface RequestWithUser extends Request {
    user: IClient
}

interface RequestAppointmentRequest extends RequestWithUser {
    body: AppointmentRequest,

}

interface GetMyListingsRequest extends RequestWithUser {
    body: CarListingQueryFields
}

interface CreateListingRequest extends RequestWithUser {
    body: CreateCarListingRequest,
    files: any
}

interface UploadCarImageRequest extends RequestWithUser {
    body: {
        licensePlate: string
    },
    file: Express.Multer.File
}

export type {
    RequestWithUser,
    RequestAppointmentRequest,
    GetMyListingsRequest,
    UploadCarImageRequest,
    CreateListingRequest
}