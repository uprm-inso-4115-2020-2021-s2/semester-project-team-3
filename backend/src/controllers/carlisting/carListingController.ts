import { RequestWithUser } from "../declarations";
import { createCarListingUseCase } from '../../use-cases'
import { ICarListing } from "../../domain";
import { Response } from 'express'


export const createCarListing = async (req:RequestWithUser, res:Response) => {
    
    const result = await createCarListingUseCase(req.body as Partial<ICarListing>, req.user)

    if (result.success) {
        res.status(200).json(result)
        return
    }

    res.status(400).json(result)

}