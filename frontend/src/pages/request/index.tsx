import { Box, Button, Checkbox, createStyles, Dialog, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, makeStyles, Radio, RadioGroup, TextField, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { AddAPhotoRounded, PhotoCamera } from "@material-ui/icons";
import React, { useEffect } from "react";
import theme from "../../theme";


export default function RequestForm(){
    const classes = useStyles();

    const [state, setState] = React.useState('pickup');

    const [values, setValues] = React.useState<any>({  //change "any" to "formModel"
        pickupDate: '',
        carLocation: '',
        pickupMethod: state, //state value
        carDropLocation: '',
        carMeetLocation: '',
    });

    const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => { // change "any" to "keyof formModel"
        setValues({ ...values, [prop]: event.target.value });  
    };

    const handleState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((event.target as HTMLInputElement).value);
        console.log(state)
    };

    const pickupBody = () => {
        if (state === "dropoff") {
            return (
                <Grid container direction="row" wrap="nowrap" className={classes.submitItem}>
                    <TextField label="Where would you like the vehicle dropped off?" type="search" variant="outlined" required className={classes.submitTextField}
                        value={values.carDropLocation}
                        onChange={handleChange('carDropLocation')}
                    />
                </Grid>
            )
        } else if (state === "meetup") {
            return (
                <Grid container direction="row" wrap="nowrap" className={classes.submitItem}>
                    <TextField label="Where will you meet for the vehicle?" type="search" variant="outlined" required className={classes.submitTextField}
                        value={values.carMeetLocation}
                        onChange={handleChange('carMeetLocation')}
                    />
                </Grid>
            )
        } else {
            return(
                <></>
            )
        }
    }

    return(
        <Grid container direction="column" wrap="nowrap" className={classes.main}>

            <Grid container direction="row" className={classes.submitItem}>
                <TextField label="Vehicle Request Date" type="search" variant="outlined" required className={classes.submitTextField}
                    value={values.pickupDate}
                    onChange={handleChange('pickupDate')}
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
                            <Grid container direction="row" justify="space-between" className={classes.submitCheck}>
                                <FormControlLabel control={<Radio color="primary" className={classes.radioIcon}/>} label="Pickup" value="pickup"/>
                                <FormControlLabel control={<Radio color="primary" className={classes.radioIcon}/>} label="Dropoff" value="dropoff"/>
                                <FormControlLabel control={<Radio color="primary" className={classes.radioIcon}/>} label="Meetup" value="meetup"/>
                            </Grid>
                        </Grid>
                    </RadioGroup>
                </Box>
            </Grid>
            
            {pickupBody()}

            <Grid container direction="row" wrap="nowrap">
                <TextField label="Additional Comments (Optional)" variant="outlined" fullWidth multiline rows={5} className={classes.submitDesc}/>
            </Grid>

        </Grid>
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
    }),
);