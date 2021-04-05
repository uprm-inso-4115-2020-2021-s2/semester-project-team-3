import React, {Context} from 'react'
import {IUser} from '../useUser'

type userContextType = {
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const UserContext:Context<userContextType | null> = React.createContext<userContextType | null>(null)