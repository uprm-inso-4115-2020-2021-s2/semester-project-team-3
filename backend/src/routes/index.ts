import express from 'express'
import authRouter from './authRoutes'

const joinedRoutes = express.Router()

joinedRoutes.use('/auth', authRouter)

export default joinedRoutes