import React from "react"
import Link from "next/link";
import { Box, Button, ButtonBase, Card, createStyles, Grid, makeStyles, Slide, Theme, Typography } from "@material-ui/core";
import ListingViewForm from "./listingViewForm";

export default function CarouselButtonItem(){
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    return(
        <>
            <ButtonBase className={classes.carouselItem} onClick={handleOpen}>
                <Grid container direction="column" wrap="nowrap" className={classes.carouselItem}>

                    <img src="/Google_G.png" className={classes.carouselImage}/>

                    <Grid container direction="column" wrap="nowrap" alignItems="flex-start" className={classes.carouselTextContainer}>
                        <Grid item className={classes.carouselTextItem}>
                            <Typography className={classes.carouselText}>Model</Typography>
                        </Grid>
                        
                        <Grid item className={classes.carouselTextItem}>
                            <Typography className={classes.carouselText}>Location</Typography>
                        </Grid>

                        <Grid item className={classes.carouselTextItem}>
                            <Typography className={classes.carouselText}>Day Rate</Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </ButtonBase>

            <ListingViewForm isOpen={open} handleClose={handleClose}/>
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({  
        carouselItem: {
            width: '100%',
            height: 420,
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