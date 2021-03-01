import { INotification, PriorityType, IClient, ErrorMsg } from "../declarations";

export class Notification implements INotification{
    client: IClient
    message: string
    priority: PriorityType

    constructor(data: Partial<INotification> = {}){
        if(!data.client || !data.message){
            throw new Error(ErrorMsg.IllegalException)
        }
        this.client = data.client as IClient;
        this.message = data.message as string;
        this.priority = data.priority? data.priority: PriorityType.NonUrgent;
    }
}