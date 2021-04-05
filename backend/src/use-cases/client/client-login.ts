import { IClientRepository, IClient, makeClient } from "../../domain";
import { UseCaseOutput, ErrorMessages } from "../declarations"


export default function makeClientLoginUseCase(clientRepo: IClientRepository) {

    return async (possibleClient: Partial<IClient>): Promise<UseCaseOutput<IClient>> => {

        let builtClient:IClient;

        try{
            builtClient = makeClient(possibleClient)
        } catch (err) {

            return {
                success: false,
                msg: err.message
            }

        }
        
        const persisted = await clientRepo.findByEmail(builtClient.email)

        if (persisted) {
            return {
                success:true,
                data:persisted as IClient
            }
        }

        const afterStoring = await clientRepo.createClient(builtClient)
            
        if (!afterStoring) {
            return {
                success: false,
                msg: ErrorMessages.CreationError
            }
        } 

        return {
            success: true,
            data: afterStoring
        }

    }

}