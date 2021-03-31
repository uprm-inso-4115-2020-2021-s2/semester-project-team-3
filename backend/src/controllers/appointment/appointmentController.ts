import { RequestAppointmentRequest } from "../declarations";
import { Response } from 'express'
import { requestAppointmentUseCase } from '../../use-cases'

export const requestAppointment = async (req:RequestAppointmentRequest, res:Response ) => {

    const result = await requestAppointmentUseCase(req.user.email, req.body)
    if (result.success) {
        res.status(200).json(result)
        return
    }
    res.status(400).json(result)

} 