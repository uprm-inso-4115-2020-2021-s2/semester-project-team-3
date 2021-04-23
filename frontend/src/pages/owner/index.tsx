import React from "react"
import Link from "next/link";
import GenericProfile from "../ui-components/genericProfile";
import { IUser, useUser } from "../../hooks/useUser";
import { useRouter } from "next/router";

export default function Index(){
    const {user, setUser} = useUser();
    const router = useRouter();

    if (user === null) {
        router.push("/")
    }

    return(
        <GenericProfile User={user as IUser} Listings={[]} Reviews={[]}/>
    )      
}
