import { Response } from "express";
import { RequestWithUser } from '../declarations'
import { clientSerialize } from './helpers'
import config from '../../config/config'


       
const login = async function( req:RequestWithUser, res:Response ) {

    // res.cookie("auth", clientSerialize(req.user.email), {
    //     httpOnly: true,
    //     maxAge: config.security.cookie_duration,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'none'
    // })

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
