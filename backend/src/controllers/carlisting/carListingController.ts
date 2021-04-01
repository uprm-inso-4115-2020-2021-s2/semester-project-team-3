import { GetMyListingsRequest, RequestWithUser } from "../declarations";
import { createCarListingUseCase, getMyListingUseCase, searchListingUseCase } from '../../use-cases'
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

export const getMyListings = async (req:GetMyListingsRequest, res:Response) => {
    const result = await getMyListingUseCase({...req.body, owner:req.user?.email}, req.query.page? Number(req.query.page): 1)

    if (result.success) {
        res.status(200).json(result)
        return
    }

    res.status(400).json(result)

}

export const searchListing = async (req:GetMyListingsRequest, res:Response) => {
    const result = await searchListingUseCase(req.body, req.query.page? Number(req.query.page): 1)
    
    if (result.success) {
        res.status(200).json(result)
        return
    }

    res.status(400).json(result)

}