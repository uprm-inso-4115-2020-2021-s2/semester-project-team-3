import express, {Request, Response} from 'express'
import { carListingController, RequestWithUser } from '../controllers'
import { fromJwt } from '../auth/passport'


const carListingRouter = express.Router() 

carListingRouter.post("/", 
    fromJwt,
    async (req: Request, res: Response) => await carListingController.createCarListing(req as RequestWithUser, res)
)

export default carListingRouter