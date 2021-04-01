import React from "react"
import Link from "next/link";
import { Button, Grid, Typography } from "@material-ui/core";

export default function Index(){
    return(
        <Grid container direction="column">

            <Grid item>
               <Link href="/lform">
                  <Button>Listing Form</Button>
               </Link>
            </Grid>

            <Grid item>
               <Link href="/listing">
                  <Button>Listing Page</Button>
               </Link>
            </Grid>

            <Grid item>
               <Link href="/owner">
                  <Button>Owner Page</Button>
               </Link>
            </Grid>

            <Grid item>
               <Link href="/request">
                  <Button>Request Page</Button>
               </Link>
            </Grid>

            <Grid item>
               <Link href="/search">
                  <Button>Search Page</Button>
               </Link>
            </Grid>

        </Grid>
       

    )
        
}
