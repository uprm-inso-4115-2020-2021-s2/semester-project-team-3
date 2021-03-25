import { makeClient } from '../../domain/factories';
import { IClient } from '../../domain/declarations';
import {IClientRepository} from '../../domain/repositories'
import {ClientModel, IClientModel} from '../models/clientmodel'

export default class ClientRepository implements IClientRepository {

    async findByEmail(email: string): Promise<IClient | null> {
        
        const client = await ClientModel
            .findOne({email:email})
            .lean()
            .exec()
            
        if (!client) {
            return null
        }

        return makeClient(client) 

    }

    async createClient(client: IClient): Promise<IClient | null> {
        
        const newUser = new ClientModel(client.toDto())

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

        const updated = await ClientModel.findOneAndUpdate({email:refetched.email}, {
            name: refetched.name,
            dateOfBirth: refetched.dateOfBirth,
            cellNumber: refetched.cellNumber,
            image: refetched.image,
            driversLicense: refetched.driversLicense,
            isVerified: refetched.isVerified
        }, {new:true}).exec()

        if (!updated){
            return null
        }

        return makeClient(updated!.toObject())

    }
}