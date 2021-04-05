import React from 'react';
import { ReactNode, useState } from 'react'
import { IUser } from '../useUser';
import { UserContext } from './userContext';


interface UserProviderProps {
    children:ReactNode,
    user:IUser|null
}

export function UserProvider(props:UserProviderProps) {

    const [user, setUser] = useState<IUser>(props.user)

    React.useEffect(()=>{
        setUser(props.user)
    }, [props.user])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}