import React from "react"
import Link from "next/link";
import { Box, Button, Card, CardContent, CardHeader, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, makeStyles, Theme, Typography } from "@material-ui/core";
import { AddCircleOutlineRounded, AddRounded } from "@material-ui/icons";
import ListingForm from "../listingForm";
import RequestForm from "../requestForm";
import OwnerListingItem from "../ui-components/ownerListingItem";
import OwnerReviewItem from "../ui-components/ownerReviewItem";
import { IUser } from "../../hooks/useUser";

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

    return(
        <>
        <Grid container direction="column" alignItems="center" className={classes.main}>

            <Grid container direction="row" wrap='nowrap' className={classes.mainInfo}>

                <img src={props.User.image} className={classes.profileImg}/>

                <Grid item>
                    <Grid container direction="column" className={classes.mainInfoItem}>
                        <Grid item>
                            <Typography variant="h3">
                                {props.User.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                {props.User.cellNumber?props.User.cellNumber:"No Cellphone Provided"}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                {props.User.email}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container direction='column' className={classes.mainContent}>

                <Grid container direction="row" wrap="nowrap" justify="flex-end" className={classes.addButtonContainer}>
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

                <Grid item>
                    <Grid container justify="center" style={{padding:4}}>
                        <Card className={classes.cardContainer}>

                            <Grid container direction='column' alignItems="center" wrap="nowrap" >
                                <Typography className={classes.cardTitle}>Select a Vehicle</Typography>
                            </Grid>

                            <CardContent>
                                <Grid container direction='column' alignItems="center" wrap="nowrap">
                                    {props.Listings.map(val => <OwnerListingItem/>)}
                                </Grid>
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container justify="center" style={{padding:4}}>
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

            </Grid>

        </Grid>

        <ListingForm isOpen={open} handleClose={handleClose}/>
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
            width: 135,
            height: 135,
        },
        mainInfoItem: {
            paddingLeft: theme.spacing(4)
        },
        mainContent: {
            marginTop: 50,
        },
        cardContainer: {
            minHeight: 600,
            maxHeight: 600,
            maxWidth: 800,
            width:"100%",
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
            marginRight: 40
        },
        addButton: {
            height: 50
        },
        addButtonIcon: {
            height: '100%',
            marginTop: 10
        },
    }),
);