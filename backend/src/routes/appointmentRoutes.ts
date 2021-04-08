import express, {Request, Response} from "express";
import { RequestAppointmentRequest } from "../controllers";
import { googleAuth } from "../auth/passport";
import {appointmentController} from '../controllers'

const appointmentRouter = express.Router()


appointmentRouter.post('/request', 
    googleAuth,
    (req: Request, res:Response) => { 
        appointmentController.requestAppointment(req as RequestAppointmentRequest, res) 
    }
)


export default appointmentRouter