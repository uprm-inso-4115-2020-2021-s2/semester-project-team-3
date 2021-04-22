import React from "react"
import Link from "next/link";
import { Box, Button, ButtonBase, Card, createStyles, Grid, makeStyles, Slide, Theme, Typography } from "@material-ui/core";

export default function CarouselBasicItem(){
    const classes = useStyles();

    return(
        <>
            
                <Grid container direction="column" wrap="nowrap" className={classes.carouselItem}>
                    <img src="/Google_G.png" className={classes.carouselImage}/>
                </Grid>
            
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({  
        carouselItem: {
            width: '100%',
            height: 500,
        },
        carouselImage: {
            width: '100%',
            height: '100%',
            objectFit: "contain",
            
        },
        carouselTextContainer: {
            marginTop: -120,
            paddingLeft: theme.spacing(2.5)
        },
        carouselTextItem: {
            
        },
        carouselText: {
            fontSize: 24,
        },
    }),
);