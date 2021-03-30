import express from 'express'
import appointmentRouter from './appointmentRoutes'
import authRouter from './authRoutes'
import carListingRouter from './carListingRoutes'

const joinedRoutes = express.Router()

joinedRoutes.use('/auth', authRouter)
joinedRoutes.use('/listing', carListingRouter)
joinedRoutes.use('/appointment', appointmentRouter)

export default joinedRoutes