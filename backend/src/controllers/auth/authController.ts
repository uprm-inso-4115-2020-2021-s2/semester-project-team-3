import { Response } from "express";
import { ILoginRequest } from './declarations'
import { clientSerialize } from './helpers'
import config from '../../config/config'


       
const login = async function( req:ILoginRequest, res:Response ) {

    res.cookie("auth", clientSerialize(req.user.email), {
        httpOnly: true,
        maxAge: config.security.cookie_duration,
        secure: process.env.NODE_ENV === 'production'
    })

    res.status(200).json({
        name: req.user.name,
        email: req.user.email,
        dateOfBirth: req.user.dateOfBirth,
        isVerified: req.user.isVerified,
        image: req.user.image,
        driversLicense: req.user.driversLicense,
        cellNumber: req.user.cellNumber
    })

}
    
export {

    login

}
