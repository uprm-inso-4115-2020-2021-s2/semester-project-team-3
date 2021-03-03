export interface IClient {
    name: string
    email: string
    dateOfBirth: Date | null
    isVerified: boolean 
    image: string | null
    driversLicense: string | null
    cellNumber: string | null
    toDto: () => Partial<IClient>
}

export interface ICarListing {
    model: string
    isVerified: boolean
    brand: string
    year: number
    cancellationFee: number
    licensePlate: string
    priceRate: number
    owner: IClient
    canDeliver: boolean
    carLicenseImage: string | null
    carDescription: string
    carImages: string[] | null
    carLocation: string
    // estimate: (arg0:number) => number
}

export interface IBaseReview {
    rating: number
    id: number | null
    review: string
}

export interface ITransaction {
    transactionNumber: number
    total: number
    description: TransactionDescriptionType | string
    date: Date
    issuer: IClient
    receiver: IClient
    status: TransactionStatusType
}

export interface IAppointment {
    appointmentNumber: number|null
    days: number
    rentee: IClient
    dateAccepted: Date|null
    appointmentDate: Date
    status: AppointmentStatusType
    carListing: ICarListing
    meetupLocation: string
    dropoffLocation: string
    transactions: ITransaction[]
    // overlaps: (arg0:IAppointment) => boolean
    // accept: () => void
    // deny: () => void
    // deliver: () => void
    // isPending: () => boolean
    // getPrice: () => number
    // securityDeposit: () => number
}


export interface IRenteeReview extends IBaseReview {
    client: IClient
}

export interface IListingReview extends IBaseReview {
    owner: IClient
}

export interface INotification {
    client: IClient
    message: string
    priority: PriorityType
}

export enum PriorityType {
    Urgent = "Urgent",
    Regular = "Regular",
    NonUrgent = "NonUrgent"
}

export enum TransactionStatusType {
    Failed = "Failed",
    Pending = "Pending",
    Completed = "Completed"
}

export enum AppointmentStatusType {
    Denied = "Denied",
    Accepted = "Accepted",
    Delivered = "Delivered",
    Completed = "Completed",
    Pending = "Pending",
    Cancelled = "Cancelled"
}

export enum TransactionDescriptionType {
    SecurityDeposit = "SecurityDeposit",
    RemainingBalance = "RemainingBalance",
    Refund = "Refund"
}

export enum ErrorMsg{
    IllegalException = "Not valid"
}