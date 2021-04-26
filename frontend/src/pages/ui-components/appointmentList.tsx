import { Box, Button, Checkbox, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, makeStyles, Radio, RadioGroup, TextField, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { AddAPhotoRounded, CloseRounded, PhotoCamera } from "@material-ui/icons";
import React, { useEffect } from "react";
import theme from "../../theme";

interface IProps {
    isOpen: boolean,
    handleClose: () => any
}

export default function AppointmentList({isOpen, handleClose}:IProps){
    const classes = useStyles();

    return(
        <Dialog
            open={isOpen}
            scroll="body" //scroll="paper" doesn't work for some reason
            maxWidth={"md"}
            fullWidth
            className={classes.mainDialog}
            onClose={handleClose}
        >
            <Grid container direction="column" wrap="nowrap" className={classes.cardContent}>

                <Grid container direction="row" wrap="nowrap" justify="space-between">
                    <DialogTitle>List of Appointment Requests</DialogTitle>
                    <IconButton onClick={handleClose}>
                        <CloseRounded className={classes.closeButton}></CloseRounded>
                    </IconButton>
                </Grid>

                <DialogContent dividers>
                    <Grid container direction="column" wrap="nowrap" alignItems="center">
                        <Typography variant="h5">Currently Active:</Typography>



                        <Typography>None Currently Active.</Typography>
                    </Grid>
                </DialogContent>

                <DialogContent dividers>
                    <Grid container direction="column" wrap="nowrap" alignItems="center">
                        <Typography variant="h5">Currently Pending:</Typography>



                        <Typography>None Currently Pending.</Typography>
                    </Grid>
                </DialogContent>

            </Grid>



        </Dialog>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainDialog: {

        },
        cardContent: {
            width: '100%',
            height: '100%',
            padding: theme.spacing(1),
            paddingTop: 12,
            paddingLeft: theme.spacing(2)
        },
        closeButton: {
            fontSize: 40,
        },
    }),
);