import express, {Request, Response} from 'express'
import passport from 'passport'

const authRouter = express.Router()
const googleAuth = passport.authenticate('google', {session:false, scope:["profile"] })

authRouter.post('/oauth2/google',
    googleAuth,
    async (req:Request, res:Response) => {
        res.status(200).json(req.user)
    }
)

export default authRouter