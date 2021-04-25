import express, {Request, Response} from "express";
import { RequestAppointmentRequest, RequestWithUser } from "../controllers";
import { googleAuth } from "../auth/passport";
import {appointmentController} from '../controllers'

const appointmentRouter = express.Router()


appointmentRouter.post('/request', 
    googleAuth,
    (req: Request, res:Response) => { 
        appointmentController.requestAppointment(req as RequestAppointmentRequest, res) 
    }
)

appointmentRouter.get('/', 
    googleAuth,
    (req:Request, res:Response) => {
        appointmentController.getMyAppointments(req as RequestWithUser, res)
    }
)

export default appointmentRouter