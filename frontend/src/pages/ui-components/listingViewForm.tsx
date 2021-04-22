import { Button, ButtonBase, Card, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { IUser } from "../../hooks/useUser";
import RequestForm from "../request";
import CarouselBasicItem from "./carouselBasicItem";

interface IProps {
    isOpen: boolean,
    handleClose: () => any
}

interface IProps2 {
    User: IUser,
    Listings: any[],
    Reviews: any[],
}

export default function ListingViewForm({isOpen, handleClose}:IProps, props:IProps2){
    const classes = useStyles();

    const [openReq, setOpenReq] = React.useState(false);
    const handleOpenReq = () => {
        handleClose();
        setOpenReq(true)
    }
    const handleCloseReq = () => {setOpenReq(false)}

    const [disableBool, setDisableBool] = React.useState(true);
    const disableToggleFalse = () => {setDisableBool(false)}
    const disableToggleTrue = () => {setDisableBool(true)}

    const actionBody = () => { // this doesn't work :(
        if(props.User && disableBool) {
            return(
                <>
                <Button className={classes.buttonRequest} onClick={disableToggleFalse}>
                    Update Listing
                </Button>
                </>
            )
        }
        else if(props.User && !disableBool) {
            return(
                <>
                <Button className={classes.buttonRequest} onClick={disableToggleTrue}>
                    Confirm Update
                </Button>
                </>
            )
        }
        else {
            return(
                <>
                <Button className={classes.buttonRequest} onClick={handleOpenReq}>
                    Request Vehicle
                </Button>
                </>
            )
        }
    }

    return(
        <>
        <Grid container direction="row" className={classes.mainDialogGrid}>
            <Dialog
                open={isOpen}
                scroll="body" //scroll="paper" doesn't work for some reason
                disableBackdropClick
                maxWidth={"md"}
                fullWidth
                className={classes.mainDialog}
                onClose={handleClose}
            >
                <Card className={classes.mainCard}>  
                    <Grid container direction="column" wrap="nowrap" className={classes.cardContent}>

                        <Grid container direction="row" wrap="nowrap" justify="flex-end">
                            <IconButton onClick={handleClose}>
                                <CloseRounded className={classes.closeButton}></CloseRounded>
                            </IconButton>
                        </Grid>

                        <DialogContent dividers>
                            <Grid container direction="column" wrap="nowrap" alignItems="center">
                                
                                <DialogTitle>Title</DialogTitle>

                                <Grid container direction="row">
                                    <Carousel
                                        className={classes.carousel}
                                        fullHeightHover
                                        stopAutoPlayOnHover
                                        animation="slide"
                                    >
                                        <CarouselBasicItem/>
                                        <CarouselBasicItem/>
                                        <CarouselBasicItem/>
                                    </Carousel>
                                </Grid>

                                <Grid container direction="row">
                                    <TextField label="Model" variant="outlined" disabled={disableBool} className={classes.infoTextField}
                                        value={"value"}
                                        InputProps={{
                                            classes: {
                                                root: classes.root,
                                                disabled: classes.disabled
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid container direction="row">
                                    <TextField label="Color" variant="outlined" disabled={disableBool} className={classes.infoTextField}
                                        value={"value"}
                                        InputProps={{
                                            classes: {
                                                root: classes.root,
                                                disabled: classes.disabled
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid container direction="row">
                                    <TextField label="Brand" variant="outlined" disabled={disableBool} className={classes.infoTextField}
                                        value={"value"}
                                        InputProps={{
                                            classes: {
                                                root: classes.root,
                                                disabled: classes.disabled
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid container direction="row">
                                    <TextField label="Day Rate" variant="outlined" disabled={disableBool} className={classes.infoTextField}
                                        value={"sinko peso"}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            classes: {
                                                root: classes.root,
                                                disabled: classes.disabled
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid container direction="row" wrap="nowrap">
                                    <TextField label="Owner" variant="outlined" disabled={disableBool} className={classes.infoTextField}
                                        value={"value"}
                                        InputProps={{
                                            classes: {
                                                root: classes.root,
                                                disabled: classes.disabled
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid container direction="row" wrap="nowrap">
                                    <TextField label="Location" variant="outlined" disabled={disableBool} className={classes.infoTextField}
                                        value={"value"}
                                        InputProps={{
                                            classes: {
                                                root: classes.root,
                                                disabled: classes.disabled
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid container direction="row" wrap="nowrap">
                                    <TextField label="Description" variant="outlined" disabled={disableBool} fullWidth multiline rows={5} className={classes.descTextField}
                                        value={"value"}
                                        InputProps={{
                                            classes: {
                                                root: classes.root,
                                                disabled: classes.disabled
                                            }
                                        }}
                                    />
                                </Grid>

                            </Grid>
                        </DialogContent>

                        <DialogActions className={classes.buttonContainer}>
                            <Grid container direction="row" justify="flex-end" wrap="nowrap">
                                <Button className={classes.buttonRequest} onClick={disableToggleFalse}>
                                    Update Listing
                                </Button>
                                <Button className={classes.buttonRequest} onClick={disableToggleTrue}>
                                    Confirm Update
                                </Button>
                                <Button className={classes.buttonRequest} onClick={handleOpenReq}>
                                    Request Vehicle
                                </Button>
                            </Grid>
                        </DialogActions>
                        

                    </Grid>
                </Card>
            </Dialog>
        </Grid>
        <RequestForm isOpen={openReq} handleClose={handleCloseReq}/>
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainDialogGrid: {
            width: '95%',
            height: '50%',
        },
        mainDialog: {

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
        carousel: {
            width: '100%',
            height: '50%',
            position: 'relative',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(4),
        },
        image: {
            height: 160,
            width: 160,
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
        closeButton: {
            fontSize: 40,
            // color: theme.palette.secondary.light,
        },
        buttonContainer: {
            marginTop: 5,
            marginRight: 5
        },
        buttonRequest: {
            fontSize: 18,
            backgroundColor: theme.palette.info.main,
        },
        infoTextField: {
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
            paddingBottom: theme.spacing(1.5),
            width: '100%',
        },
        descTextField: {
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
        },
        root: {
            "&$disabled": {
              color: theme.palette.common.black
            }
        },
        disabled: {},

    }),
);