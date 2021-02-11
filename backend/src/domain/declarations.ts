interface IClient {
    name: string
    email: string
    dateOfBirth: Date
    isVerified: boolean 
    listings: ICarListing[]
    image: URL
    driversLicense: URL
    cellNumber: string
    verify: () => void
}

interface ICarListing {
    model: string
    isVerified: boolean
    brand: string
    year: number
    cancellationFee: number
    licensePlate: string
    priceRate: number
    owner: IClient
    canDeliver: boolean
    carLicenseImage: URL
    carDescription: string[]
    carImages: URL[]
    carLocation: string
    estimate: (arg0:number) => number
}

interface IBaseReview {
    rating: number
    id: number
    review: string
}

interface ITransaction {
    transactionNumber: number
    total: number
    date: Date
    issuer: IClient
    receiver: IClient
    status: TrasactionStatusType
}

interface IAppointment {
    appointmentNumber: number
    days: number
    rentee: IClient
    dateAccepted: Date
    appointmentDate: Date
    status: AppointmentStatusType
    carListing: ICarListing
    meetupLocation: string
    dropoffLocation: String
    transactions: ITransaction[]
    overlaps: (arg0:IAppointment) => boolean
    accept: () => void
    deny: () => void
    deliver: () => void
    isPending: () => boolean
    getPrice: () => number
    securityDeposit: () => number
}


interface IRenteeReview extends IBaseReview {
    client: IClient
}

interface IListingReview extends IBaseReview {
    owner: IClient
}

interface INotification {
    client: IClient
    message: string
    priority: PriorityType
}

enum PriorityType {
    Urgent = "Urgent",
    Regular = "Regular",
    NonUrgent = "NonUrgent"
}

enum TrasactionStatusType {
    Failed = "Failed",
    Pending = "Pending",
    Completed = "Completed"
}

enum AppointmentStatusType {
    Denied = "Denied",
    Accepted = "Accepted",
    Delivered = "Delivered",
    Completed = "Completed",
    Pending = "Pending",
    Cancelled = "Cancelled"
}