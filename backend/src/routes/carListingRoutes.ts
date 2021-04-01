import express, {Request, Response} from 'express'
import { carListingController, GetMyListingsRequest, RequestWithUser, UploadCarImageRequest } from '../controllers'
import { fromJwt } from '../auth/passport'


const carListingRouter = express.Router() 

carListingRouter.post("/", 
    fromJwt,
    async (req: Request, res: Response) => await carListingController.createCarListing(req as RequestWithUser, res)
)

carListingRouter.get("/",
    fromJwt,
    async (req:Request, res:Response) => await carListingController.getMyListings(req as GetMyListingsRequest, res)
)

carListingRouter.get('/search',
    async (req:Request, res:Response) => carListingController.searchListing(req as GetMyListingsRequest, res)
)

carListingRouter.put('/upload-car-image',
    fromJwt,
    async (req:Request, res:Response) => carListingController.uploadCarImage(req as UploadCarImageRequest, res)
)

export default carListingRouter