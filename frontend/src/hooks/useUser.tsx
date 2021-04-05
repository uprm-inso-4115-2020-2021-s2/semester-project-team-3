import { useContext } from 'react'
import { UserContext } from './context/userContext'

export interface IUser {
    name: string
    email: string
    dateOfBirth: Date | null
    isVerified: boolean 
    image: string | null
    driversLicense: string | null
    cellNumber: string | null
}

export function useUser(){
    return useContext(UserContext)
}
