import express, {Request, Response} from 'express'
import { authController, RequestWithUser } from '../controllers'
import { googleAuth, fromJwt } from '../auth/passport'

const authRouter = express.Router()


authRouter.post('/oauth2/google',
    googleAuth,
    async (req: Request, res: Response) => await authController.login(req as RequestWithUser, res)
)

authRouter.post('/logout',
    async (req: Request, res:Response) => {
        res.clearCookie('auth'),
        res.status(200)
    }
)

authRouter.get('/user', 
    fromJwt,
    async (req: Request, res: Response) => { res.status(200).json(req.user) }
)

export default authRouter