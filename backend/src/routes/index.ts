import express from 'express'
import authRouter from './authRoutes'
import carListingRouter from './carListingRoutes'

const joinedRoutes = express.Router()

joinedRoutes.use('/auth', authRouter)
joinedRoutes.use('/listing', carListingRouter)

export default joinedRoutes