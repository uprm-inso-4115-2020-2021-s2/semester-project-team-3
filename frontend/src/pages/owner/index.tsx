import React from "react"
import Link from "next/link";
import { Box, Button, Card, CardContent, CardHeader, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, makeStyles, Theme, Typography } from "@material-ui/core";
import { AddCircleOutlineRounded, AddRounded } from "@material-ui/icons";
import ListingForm from "../listingForm";
import RequestForm from "../request";
import OwnerListingItem from "../ui-components/ownerListingItem";
import OwnerReviewItem from "../ui-components/ownerReviewItem";

export default function Index(){
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    const [openReq, setOpenReq] = React.useState(false);
    const handleOpenReq = () => {setOpenReq(true)}
    const handleCloseReq = () => {setOpenReq(false)}

    return(
        <Grid container direction="column" alignItems="center" className={classes.main}>

            <Grid container direction="row" wrap='nowrap' className={classes.mainInfo}>

                <img src="/Google_G.png" className={classes.profileImg}/>

                <Grid item>
                    <Grid container direction="column" className={classes.mainInfoItem}>
                        <Grid item>
                            <Typography variant="h3">
                                Name goes here
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                Address goes here
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                Phone number here
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                Email address here
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container direction='row' className={classes.mainContent}>

                <Grid container direction="row" wrap="nowrap" justify="flex-end" className={classes.addButtonContainer}>

                    <Grid item>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            className={classes.addButton}
                            onClick={handleOpenReq}
                            endIcon={<Icon className={classes.addButtonIcon}><AddCircleOutlineRounded/></Icon>}
                        >
                            Temporary Request Button
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

                <Grid item xs={12} sm={6}>
                    <Grid container justify="center" style={{padding:4}}>
                        <Card className={classes.cardContainer}>

                            <Grid container direction='column' alignItems="center" wrap="nowrap" >
                                <Typography className={classes.cardTitle}>Select a Vehicle</Typography>
                            </Grid>

                            <CardContent>
                                <Grid container direction='column' alignItems="center" wrap="nowrap">
                                    {<OwnerListingItem/>}
                                    {<OwnerListingItem/>}
                                    {<OwnerListingItem/>}
                                </Grid>
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
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
            
            <Dialog
                open={open}
                keepMounted
                scroll="paper"
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth={"md"}
                fullWidth
                className={classes.dialogMain}
                onClose={handleClose}
            >
                <Grid container direction="column" alignItems="center">
                    <DialogTitle>Submit Information For Your New Listing</DialogTitle>
                </Grid>

                <DialogContent dividers>
                    <ListingForm/>
                </DialogContent>
                
                <DialogActions className={classes.buttonContainer}>
                    <Button className={classes.buttonClose} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className={classes.buttonSubmit} onClick={handleClose}>
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>

            <Dialog
                open={openReq}
                keepMounted
                scroll="paper"
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth={"md"}
                fullWidth
                className={classes.dialogMain}
                onClose={handleCloseReq}
            >
                <Grid container direction="column" alignItems="center">
                    <DialogTitle>Submit Your Listing Request</DialogTitle>
                </Grid>

                <DialogContent dividers>
                    <RequestForm/>
                </DialogContent>
                
                <DialogActions className={classes.buttonContainer}>
                    <Button className={classes.buttonClose} onClick={handleCloseReq}>
                        Cancel
                    </Button>
                    <Button className={classes.buttonSubmit} onClick={handleCloseReq}>
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>

        </Grid>
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

        dialogMain: {
            width: '100%',
            height: '100%',
            paddingTop: theme.spacing(6),
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
        },
        buttonContainer: {
            padding: theme.spacing(1.5),
            marginRight: 5
        },
        buttonClose: {
            fontSize: 18,
            backgroundColor: "#E53939",
        },
        buttonSubmit: {
            fontSize: 18,
            backgroundColor: "#6ACB73",
        },
    }),
);