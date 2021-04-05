import express, {Request, Response} from 'express'
import { carListingController, GetMyListingsRequest, RequestWithUser, UploadCarImageRequest } from '../controllers'
import { fromJwt, googleAuth } from '../auth/passport'


const carListingRouter = express.Router() 

carListingRouter.post("/", 
    googleAuth,
    async (req: Request, res: Response) => await carListingController.createCarListing(req as RequestWithUser, res)
)

carListingRouter.get("/",
    googleAuth,
    async (req:Request, res:Response) => await carListingController.getMyListings(req as GetMyListingsRequest, res)
)

carListingRouter.get('/search',
    async (req:Request, res:Response) => carListingController.searchListing(req as GetMyListingsRequest, res)
)

carListingRouter.put('/upload-car-image',
    googleAuth,
    async (req:Request, res:Response) => carListingController.uploadCarImage(req as UploadCarImageRequest, res)
)

export default carListingRouter