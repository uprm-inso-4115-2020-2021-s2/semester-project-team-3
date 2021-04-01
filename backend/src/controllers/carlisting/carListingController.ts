import { GetMyListingsRequest, RequestWithUser, UploadCarImageRequest } from "../declarations";
import { createCarListingUseCase, getMyListingUseCase, searchListingUseCase, uploadCarImageUseCase } from '../../use-cases'
import { ICarListing } from "../../domain";
import { Request, Response } from 'express'
import multer from "multer";
import { storage, imageFilter } from "../../config/multer-config";


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

export const uploadCarImage = async (req:UploadCarImageRequest, res:Response) => {
    const upload = multer({storage: storage, fileFilter: imageFilter}).single('carImageUpload')

    upload(req, res, async function(err:any) {

        if (err) {
            res.status(400).json({
                success: false,
                msg: err.message
            })
            return
        }
        const result = await uploadCarImageUseCase(req.body.licensePlate, req.user.email, req.file)

        if (result.success) {
            res.status(200).json(result)
            return
        }

        res.status(400).json(result)

    })
}