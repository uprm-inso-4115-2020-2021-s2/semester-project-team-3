export interface IClient {
    name: string
    email: string
    dateOfBirth: Date
    isVerified: boolean 
    image: string
    driversLicense: string
    cellNumber: string
    verify: () => void
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
    carLicenseImage: string
    carDescription: string[]
    carImages: string[]
    carLocation: string
    estimate: (arg0:number) => number
}

export interface IBaseReview {
    rating: number
    id: number
    review: string
}

export interface ITransaction {
    transactionNumber: number
    total: number
    description: TransactionDescriptionType | string
    date: Date
    issuer: IClient
    receiver: IClient
    status: TrasactionStatusType
}

export interface IAppointment {
    appointmentNumber: number
    days: number
    rentee: IClient
    dateAccepted: Date
    appointmentDate: Date
    status: AppointmentStatusType
    carListing: ICarListing
    meetupLocation: string
    dropoffLocation: string
    transactions: ITransaction[]
    overlaps: (arg0:IAppointment) => boolean
    accept: () => void
    deny: () => void
    deliver: () => void
    isPending: () => boolean
    getPrice: () => number
    securityDeposit: () => number
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

export enum TrasactionStatusType {
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