import { ITransaction, IClient, TransactionDescriptionType, TransactionStatusType, ErrorMsg } from "../declarations";

export class Transaction implements ITransaction{

    transactionNumber: number
    total: number
    description: TransactionDescriptionType | string
    date: Date
    issuer: IClient
    receiver: IClient
    status: TransactionStatusType

    constructor(data: Partial<ITransaction> = {}){
        if (!data.transactionNumber || !data.total || !data.date || !data.issuer || !data.receiver){
            throw new Error(ErrorMsg.IllegalException)
        }

        this.transactionNumber = data.transactionNumber as number;
        this.total = data.total as number;
        this.description = data.description? data.description:"";
        this.date = data.date as Date;
        this.issuer = data.issuer as IClient;
        this.receiver = data.receiver as IClient;
        this.status = data.status? data.status : TransactionStatusType.Pending;

    }

}