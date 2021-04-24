import { CreateListingRequest, GetMyListingsRequest, RequestWithUser, UploadCarImageRequest } from "../declarations";
import { File, CreateCarListingRequest, createCarListingUseCase, getMyListingUseCase, searchListingUseCase, uploadCarImageUseCase } from '../../use-cases'
import { ICarListing } from "../../domain";
import { request, Request, Response } from 'express'
import multer from "multer";
import { storage, imageFilter } from "../../config/multer-config";
import { promisify } from "util";
import fs from 'fs'

const uploadSetting = multer({storage: storage, fileFilter: imageFilter})

const unlinkAsync = promisify(fs.unlink)

export const createCarListing = async (req:CreateListingRequest, res:Response) => {
    
    let createupload = uploadSetting.fields([{
        name: 'carImages', maxCount: 5
      }, {
        name: 'carLicenseImage', maxCount: 1
    }])

    createupload(req, res, async function(err:any) {
        
        if (err) {
            res.status(400).json({success:false, msg: err.message})
            return
        }

        const request = {
            ...req.body,
            owner: req.user.email,
            carImages: req.files?.carImages,
            carLicenseImage: req.files?.carLicenseImage
        }

        const result = await createCarListingUseCase(request)

        request.carImages?.map((val: File) => unlinkAsync(val.path))
        request.carLicenseImage?.map((val: File) => unlinkAsync(val.path))
        
        if (result.success) {
            res.status(200).json(result)
            return
        }

        res.status(400).json(result)

    })
    

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
    let upload = uploadSetting.single('carImageUpload')

    upload(req, res, async function(err:any) {

        if (err) {
            res.status(400).json({
                success: false,
                msg: err.message
            })
            return
        }
        const result = await uploadCarImageUseCase(req.body.licensePlate, req.user.email, req.file)
        
        unlinkAsync(req.file.path)
        
        if (result.success) {
            res.status(200).json(result)
            return
        }


        res.status(400).json(result)

    })
}