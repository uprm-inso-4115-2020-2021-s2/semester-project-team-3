import React from "react"
import Link from "next/link";
import { Box, Button, Card, CardContent, CardHeader, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, makeStyles, Theme, Typography } from "@material-ui/core";
import { AddCircleOutlineRounded, AddRounded, AirportShuttleRounded } from "@material-ui/icons";
import ListingForm from "../listingForm";
import RequestForm from "../requestForm";
import OwnerListingItem from "../ui-components/ownerListingItem";
import OwnerReviewItem from "../ui-components/ownerReviewItem";
import { IUser } from "../../hooks/useUser";
import AppointmentList from "./appointmentList";

interface IProps {
    User: IUser,
    Listings: any[],
    Reviews: any[],
}

export default function GenericProfile(props:IProps){
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    const [openAppointments, setOpenAppointments] = React.useState(false);
    const handleOpenAppointments = () => {setOpenAppointments(true)}
    const handleCloseAppointments = () => {setOpenAppointments(false)}

    return(
        <>
        <Grid container direction="column" alignItems="center" className={classes.main}>

            <Grid container direction="column" alignItems="center" className={classes.mainInfoItem}>
               
                <img src={props.User.image} className={classes.profileImg}/>
               
                <Grid item>
                    <Typography className={classes.nameText}>
                        {props.User.name}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="h5">
                        {props.User.email}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="h5">
                        {props.User.cellNumber?props.User.cellNumber:"No Cellphone Provided"}
                    </Typography>
                </Grid>

                <Grid container direction="row" wrap="nowrap" justify="center" className={classes.addButtonContainer}>
                    <Grid item>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className={classes.addButton}
                            onClick={handleOpenAppointments}
                            endIcon={<Icon className={classes.addButtonIcon}><AirportShuttleRounded/></Icon>}
                        >
                            View Appointments
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className={classes.addButton}
                            onClick={handleOpen}
                            endIcon={<Icon className={classes.addButtonIcon}><AddCircleOutlineRounded/></Icon>}
                        >
                            Create New Listing
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container direction='column' alignItems='center' className={classes.mainContent}>


                    <Card className={classes.cardContainer}>
                        <Grid container direction='column' alignItems="center" wrap="nowrap" >
                            <Typography className={classes.cardTitle}>Select a Vehicle</Typography>
                        </Grid>

                        <CardContent>
                            <Grid container direction='column' alignItems="center" wrap="nowrap">
                                {props.Listings.map((val, index) => <OwnerListingItem key={index} listing={val}/>)}
                            </Grid>
                        </CardContent>
                    </Card>



                    <Card className={classes.cardContainer}>  
                        <Grid container direction='column' alignItems="center" wrap="nowrap" >
                            <Typography className={classes.cardTitle}>Reviews</Typography>
                        </Grid>

                        <CardContent>
                            <Grid container direction='column' alignItems="center" wrap="nowrap">
                                {<OwnerReviewItem/>}
                                {<OwnerReviewItem/>}
                                {<OwnerReviewItem/>}
                            </Grid>
                        </CardContent>
                    </Card>


            </Grid>

        </Grid>

        <ListingForm isOpen={open} handleClose={handleClose}/>
        <AppointmentList isOpen={openAppointments} handleClose={handleCloseAppointments}/>
        </>
    )      
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {

        },
        mainInfo: {
            paddingTop: theme.spacing(8),
            paddingLeft: theme.spacing(8),
        },
        profileImgItem: {

        },
        profileImg: {
            width: 200,
            height: 200,
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2)
        },
        nameText: {
            fontSize: 40,
        },
        mainInfoItem: {
            // paddingLeft: theme.spacing(4)
        },
        mainContent: {
            marginTop: theme.spacing(3),
            width: '100%',
        },
        mainContentItem: {
            width: '95%',
        },
        cardContainer: {
            height: 700,
            width:"95%",
            marginBottom: 30,
            backgroundColor: theme.palette.primary.main,
            overflow: 'auto',
        },
        // cardContent: {
        //     paddingTop: theme.spacing(1),
        //     width: '100%',
        // },
        cardTitle: {
            fontSize: 30,
            paddingTop: theme.spacing(2)
        },
        cardItem: {
            marginTop: 30,
            width: '95%',
        },

////

        addButtonContainer: {
            marginTop: theme.spacing(2)
        },
        addButton: {
            height: 50,
            marginLeft: 5,
            marginRight: 5,
        },
        addButtonIcon: {
            height: '100%',
            marginTop: 10
        },
    }),
);