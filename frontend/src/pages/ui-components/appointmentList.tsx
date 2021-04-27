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
            
            <Grid container direction="row" justify="center">
                <DialogTitle>List of Appointment Requests</DialogTitle>
            </Grid>

            <Grid container direction="column" wrap="nowrap" className={classes.cardContent}>
                <DialogContent dividers>
                    <Grid container direction="column" wrap="nowrap" alignItems="center">
                        <Typography variant="h5" className={classes.subtitleText}>Currently Active:</Typography>



                        <Typography>None Currently Active.</Typography>
                    </Grid>
                </DialogContent>

                <DialogContent dividers>
                    <Grid container direction="column" wrap="nowrap" alignItems="center">
                        <Typography variant="h5" className={classes.subtitleText}>Currently Pending:</Typography>



                        <Typography>None Currently Pending.</Typography>
                    </Grid>
                </DialogContent>

            </Grid>

            <DialogActions className={classes.buttonContainer}>
                <Button className={classes.buttonClose} onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>

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
        },
        subtitleText: {
            marginBottom: theme.spacing(1),
        },
        buttonContainer: {
            padding: theme.spacing(1),
            marginRight: 10,
        },
        buttonClose: {
            fontSize: 18,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),        
            backgroundColor: theme.palette.primary.light,
        },
    }),
);