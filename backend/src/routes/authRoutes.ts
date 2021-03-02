import express, {Request, Response} from 'express'
import passport from 'passport'
import { authController, ILoginRequest } from '../controllers'

const authRouter = express.Router()
const googleAuth = passport.authenticate('google', {session:false, scope:["profile"] })

authRouter.post('/oauth2/google',
    googleAuth,
    async (req: Request, res: Response) => await authController.login(req as ILoginRequest, res)
)

authRouter.post('/logout',
    async (req: Request, res:Response) => {
        res.clearCookie('auth'),
        res.status(200)
    }
)

export default authRouter