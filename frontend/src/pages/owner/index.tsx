import React, { useEffect } from "react"
import Link from "next/link";
import GenericProfile from "../ui-components/genericProfile";
import { IUser, useUser } from "../../hooks/useUser";
import { useRouter } from "next/router";
import fetchMyListings from "../../requests/myListings";
import useSWR from 'swr'

export default function Index(){
    const {user, setUser} = useUser();
    const router = useRouter();
    
    const {data:listings, error} = useSWR(`ownerProfile/${sessionStorage.getItem('access_token')}`, async ()=>{
        return await fetchMyListings(sessionStorage.getItem('access_token'))
    })

    useEffect(() => {
        if (user === null) {
            router.push("/")
        }
    }, [user]) 
    
    if(user) {
        return(
            <GenericProfile User={user as IUser} Listings={listings?.data? listings.data: []} Reviews={[]}/>
        )      
    } else {
        return <p>Loading...</p>
    }
}
