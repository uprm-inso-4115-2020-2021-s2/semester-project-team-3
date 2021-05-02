import { Button, ButtonBase, Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import React, { useEffect } from "react";
import AppointmentList from "./appointmentList";
import ListingViewForm from "./listingViewForm";


export default function OwnerListingItem({listing}){
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    useEffect(()=> {
        console.log(listing)
    }, [listing])

    return(
        <>
        <Grid container direction="column" className={classes.main}>
            <ButtonBase className={classes.mainButton} onClick={handleOpen}>  
                <Card className={classes.mainCard}>
                    <Grid container direction="row" wrap="nowrap" className={classes.cardContent}> 
                        
                        <Grid item>
                            {listing.carImages?.length? <img src={listing.carImages[0]} className={classes.image} />: <img src="/cartoon_car.jpg" className={classes.image}/>}                         
                        </Grid>

                        <Grid item className={classes.textContainerItem}>
                            <Grid container direction="column" alignItems="flex-start" className={classes.textContainer}>
                                <Typography noWrap className={classes.listingText}>
                                    Title: {listing.title}
                                </Typography>

                                <Typography noWrap className={classes.listingText}>
                                    Model: {listing.brand} {listing.model}
                                </Typography>

                                <Typography noWrap className={classes.listingText}>
                                    Location: {listing.carLocation.address}
                                </Typography>

                                <Typography noWrap className={classes.listingText}>
                                    Day Rate: ${listing.priceRate.toFixed(2)}
                                </Typography>

                                
                            </Grid>
                        </Grid>

                    </Grid>  
                </Card>   
            </ButtonBase>

        </Grid>
        
        <ListingViewForm isOpen={open} handleClose={handleClose}/>
           
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            width: '95%',
            paddingBottom: theme.spacing(1.5),
        },
        mainButton: {
            width: '100%',
        },
        mainCard: {
            width: '100%',
            
        },
        cardContent: {
            width: '100%',
            height: '100%',
            padding: theme.spacing(1),
            paddingTop: 12,
            paddingLeft: theme.spacing(2)
        },
        image: {
            height: 160,
            width: 200,
        },
        textContainerItem: {
            width: '70%'
        },
        textContainer: {
            height: '100%',
            width: '100%',
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(2.5),
        },
        listingText: {
            fontSize: 20,
            maxWidth: '88%',
            paddingBottom: theme.spacing(1)
        },
        appointmentContainer: {
            width: '100%',
            paddingRight: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        cardAppointments: {
            width: '100%',
            paddingTop: 30,
            marginTop: -20,
        },
        requestButton: {
            backgroundColor: theme.palette.secondary.light,
        },

    }),
);