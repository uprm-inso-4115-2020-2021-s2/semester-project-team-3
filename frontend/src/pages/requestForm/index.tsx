import { Box, Button, Checkbox, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, makeStyles, Radio, RadioGroup, TextField, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { AddAPhotoRounded, PhotoCamera } from "@material-ui/icons";
import React, { useEffect } from "react";
import theme from "../../theme";

interface IProps {
    isOpen: boolean,
    handleClose: () => any
}

export default function RequestForm({isOpen, handleClose}:IProps){
    const classes = useStyles();

    const [state, setState] = React.useState('pickup');

    const [values, setValues] = React.useState<any>({  //change "any" to "formModel"
        pickupDate: '',
        carLocation: '',
        pickupMethod: state, //state value
        carDropLocation: '',
        carMeetLocation: '',
        days: 1
    });

    const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => { // change "any" to "keyof formModel"
        setValues({ ...values, [prop]: event.target.value });  
    };

    const handleState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((event.target as HTMLInputElement).value);
        console.log(state)
    };

    const pickupBody = () => {
        if (state === "meetup") {
            return (
                <Grid container direction="row" wrap="nowrap" className={classes.submitItem}>
                    <TextField label="Where will you meet for the vehicle?" type="search" variant="outlined" required className={classes.submitTextField}
                        value={values.carMeetLocation}
                        onChange={handleChange('carMeetLocation')}
                    />
                </Grid>
            )
        }
    }

    return(
        <Dialog
            open={isOpen}
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
                <DialogTitle>Submit Your Listing Request</DialogTitle>
            </Grid>

            <DialogContent dividers>
                <Grid container direction="column" wrap="nowrap" className={classes.main}>

                    <Grid container direction="row" className={classes.submitItem}>
                        <TextField label="Vehicle Request Date" type="search" variant="outlined" required className={classes.submitTextField}
                            value={values.pickupDate}
                            onChange={handleChange('pickupDate')}
                        />
                    </Grid>

                    <Grid container direction="row" className={classes.submitItem}>
                        <TextField label="Amount of Days" type="number" variant="outlined" InputProps={{ inputProps: {min: 1}}} required className={classes.submitTextField}
                            value={values.days}
                            onChange={handleChange('days')}
                        />
                    </Grid>

                    <Grid container direction="row" wrap="nowrap" className={classes.submitItem}>
                        <TextField label="Car Location" type="search" variant="outlined" disabled className={classes.submitTextField}
                            value={values.carLocation}
                            onChange={handleChange('carLocation')}
                        />
                    </Grid>

                    <Grid item className={classes.boxGridItem}>
                        <Box border={1} borderColor="grey.400" borderRadius="borderRadius" className={classes.boxBorder}>
                            <RadioGroup value={state} onChange={handleState}>
                                <Grid container direction="column" wrap="nowrap" alignItems="center" className={classes.checkContainer}>
                                    <Typography className={classes.checkText}>Vehicle Pickup Method</Typography>
                                    <Grid container direction="row" justify="space-around" className={classes.submitCheck}>
                                        <FormControlLabel control={<Radio color="primary" className={classes.radioIcon}/>} label="Pickup" value="pickup"/>
                                        <FormControlLabel control={<Radio color="primary" className={classes.radioIcon}/>} label="Meetup" value="meetup"/>
                                    </Grid>
                                </Grid>
                            </RadioGroup>
                        </Box>
                    </Grid>
                    
                    {pickupBody()}

                    <Grid container direction="row" wrap="nowrap" className={classes.submitItem}>
                        <TextField label="Where will the vehicle be dropped off?" type="search" variant="outlined" required className={classes.submitTextField}
                            value={values.carDropLocation}
                            onChange={handleChange('carDropLocation')}
                        />
                    </Grid>

                    <Grid container direction="row" wrap="nowrap">
                        <TextField label="Additional Comments (Optional)" variant="outlined" fullWidth multiline rows={5} className={classes.submitDesc}/>
                    </Grid>

                </Grid>
            </DialogContent>

            <DialogActions className={classes.buttonContainer}>
                <Button className={classes.buttonClose} onClick={handleClose}>
                    Cancel
                </Button>
                <Button className={classes.buttonSubmit} onClick={null}>
                    Submit
                </Button>
            </DialogActions>

        </Dialog>
    )
        
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        [theme.breakpoints.down('sm')]: {
            backgroundColor: theme.palette.secondary.main,
        },
        main: {
            padding: theme.spacing(1),
        },
        submitItem: {
            
        },
        submitTextField: {
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
            paddingBottom: theme.spacing(1.5),
            width: '100%',
        },
        boxGridItem: {
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
            paddingBottom: theme.spacing(1.5),
        },
        boxBorder: {

        },
        submitCheck: {
            paddingLeft: theme.spacing(1.5),
        },
        submitDesc: {
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
        },

        inputRoot: {
            "&$disabled": {
              color: theme.palette.common.black
            }
        },
        disabled: {},

        radioIcon: {

        },
        checkText: {
            fontSize: 20
        },

        ////////////////////////////////////////////////////////////////

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