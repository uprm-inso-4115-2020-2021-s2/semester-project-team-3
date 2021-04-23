import { RequestAppointmentRequest, RequestWithUser } from "../declarations";
import { Response } from 'express'
import { getMyAppointmentUseCase, requestAppointmentUseCase } from '../../use-cases'
import { GetAppointmentRequest } from "../../use-cases/declarations";

export const requestAppointment = async (req:RequestAppointmentRequest, res:Response ) => {

    const result = await requestAppointmentUseCase(req.user.email, req.body)
    if (result.success) {
        res.status(200).json(result)
        return
    }
    res.status(400).json(result)

}

export const getMyAppointments = async (req:RequestWithUser, res: Response) => {

    try {
        const result = await getMyAppointmentUseCase({
            ...req.body,
            owner: req.user.email
        })
        if (result.success) {
            res.status(200).json(result)
            return
        }
        res.status(400).json(result)
    }catch(err) {
        res.status(500).json(err.message)
    }
    

}