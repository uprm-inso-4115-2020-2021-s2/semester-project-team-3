import { IClient } from "./declarations";


export interface IClientRepository {

    findByEmail(email: string):Promise<IClient | null> 
    createClient(client: IClient):Promise<IClient | null>
    updateClient(email:string, client: Partial<IClient>):Promise<IClient | null> 

}