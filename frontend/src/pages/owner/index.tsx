import React, { useEffect } from "react"
import Link from "next/link";
import GenericProfile from "../ui-components/genericProfile";
import { IUser, useUser } from "../../hooks/useUser";
import { useRouter } from "next/router";

export default function Index(){
    const {user, setUser} = useUser();
    const router = useRouter();
    
    useEffect(() => {
        if (user === null) {
            router.push("/")
        }
    }, [user]) 
    
    if(user) {
        return(
            <GenericProfile User={user as IUser} Listings={[]} Reviews={[]}/>
        )      
    } else {
        return <p>Loading...</p>
    }
}
