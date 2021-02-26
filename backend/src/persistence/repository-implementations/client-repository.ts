import { makeClient } from '../../domain/factories';
import { IClient } from '../../domain/declarations';
import {IClientRepository} from '../../domain/repositories'
import {ClientModel, IClientModel} from '../models/clientmodel'

export default class ClientRepository implements IClientRepository {

    async findByEmail(email: string): Promise<IClient | null> {
        
        const client = await ClientModel
            .findOne({email:email})
            
        if (!client) {
            return null
        }

        return makeClient(client) 

    }

    async createClient(client: IClient): Promise<IClient | null> {
        
        const newUser = new ClientModel({
            email: client.email,
            name: client.name,
            dateOfBirth: client.dateOfBirth,
            isVerified: client.isVerified,
            image: client.image,
            driversLicense: client.driversLicense,
            cellNumber: client.cellNumber
        } as IClientModel)

        try {
            await newUser.save()
        } catch {
            return null
        }

        return makeClient(newUser) 

    }

    async updateClient(email: string, client: Partial<IClient>): Promise<IClient | null> {
        const refetched = await this.findByEmail(email)

        if (!refetched) {
            return null
        }

        if (client.name && client.name !== refetched.name) {
            refetched.name = client.name as string
        }

        if (client.image && client.image !== refetched.image) {
            refetched.image = client.image
        }

        if (client.driversLicense && client.driversLicense !== refetched.driversLicense) {
            refetched.driversLicense = client.driversLicense
        }

        if (client.dateOfBirth && client.dateOfBirth !== refetched.dateOfBirth) {
            refetched.dateOfBirth = client.dateOfBirth
        }

        if (client.cellNumber && client.cellNumber !== refetched.cellNumber) {
            refetched.cellNumber = client.cellNumber
        }

        await ClientModel.findOneAndUpdate({email:refetched.email}, refetched)

        return makeClient(refetched)

    }
}