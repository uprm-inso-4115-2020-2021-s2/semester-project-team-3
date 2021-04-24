import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, makeStyles, TextField, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { AddAPhotoRounded, LocationSearchingTwoTone, PhotoCamera } from "@material-ui/icons";
import React, { useEffect } from "react";
import GooglePlacesAuto from '../ui-components/google-places/google-places'
import theme from "../../theme";
import createListing from "../../requests/createListing";
import { useUser } from "../../hooks/useUser";

interface IProps {
    isOpen: boolean,
    handleClose: () => any
}

export default function ListingForm({isOpen, handleClose}:IProps){
    const classes = useStyles();
    const theme = useTheme();

    const {user} = useUser()

    const [values, setValues] = React.useState<any>({  //change "any" to "formModel"
        listingTitle: '',
        carBrand: '',
        carModel: '',
        licensePlate: '',
        color: '',
        dayRate: null,
        carDocuments: [],
        carPictures: [],
        carDescription: ''
    });

    const [location, setLocation] = React.useState<any>({
        lat:null,
        lon:null,
        address:null
    })

    const submit = async () => {
        let body = {
            licensePlate: values.licensePlate,
            title: values.listingTitle,
            carLocationLat: location.lat,
            carLocationLon: location.lon,
            carLocationAddress: location.address,
            model: values.carModel,
            brand: values.carBrand,
            year:2020,
            carDescription: "testing",
            cancellationFee: 10.00,
            priceRate: values.dayRate,
            accessToken: sessionStorage.getItem('access_token'),
        }
        console.log(body)
        const result = await createListing(body)
        console.log(result)
    }

    const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => { // change "any" to "keyof formModel"
        setValues({ ...values, [prop]: event.target.value });  
    };

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
                <DialogTitle>Submit Information For Your New Listing</DialogTitle>
            </Grid>

            <DialogContent dividers>
                <Grid container direction="column" wrap="nowrap" className={classes.main}>
                    <Grid container direction="row" className={classes.titleItem}>
                        <TextField label="Title" type="search" variant="outlined" required fullWidth
                            value={values.listingTitle}
                            onChange={handleChange('listingTitle')}
                        />
                    </Grid>

                    <Grid container direction="row" className={classes.submitItem}>
                        <TextField label="Car Brand" type="search" variant="outlined" required className={classes.submitTextField}
                            value={values.carBrand}
                            onChange={handleChange('carBrand')}
                        />
                        <TextField label="Car Model" type="search" variant="outlined" required className={classes.submitTextField}
                            value={values.carModel}
                            onChange={handleChange('carModel')}
                        />
                    </Grid>

                    <Grid container direction="row" className={classes.submitItem}>
                        <TextField label="License Plate" type="search" variant="outlined" required className={classes.submitTextField}
                            value={values.licensePlate}
                            onChange={handleChange('licensePlate')}
                        />
                        <TextField label="Color" type="search" variant="outlined" required className={classes.submitTextField}
                            value={values.color}
                            onChange={handleChange('color')}
                        />
                    </Grid>

                    <Grid container direction="row" className={classes.submitItem}>
                        {/* <TextField label="Location" type="search" variant="outlined" required className={classes.submitTextField}
                            value={values.location}
                            onChange={handleChange('location')}
                        /> */}
                        <GooglePlacesAuto onAddressSelect={async (lat, lon, address) => {
                            setLocation({
                                lat:lat,
                                lon:lon,
                                address:address
                            })
                        }}/>
                        <TextField label="Day Rate (USD)" type="number" variant="outlined" required className={classes.submitTextField}
                            value={values.dayRate}
                            onChange={handleChange('dayRate')}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid container direction="row" className={classes.submitItem}>
                        <TextField label="Upload Car Documents..." variant="outlined" disabled required className={classes.submitTextField} // might change to button group
                            value={values.carDocuments}
                            onChange={handleChange('carDocuments')}
                            InputProps={{
                                endAdornment:
                                    <IconButton onClick={null}>
                                        <AddAPhotoRounded className={classes.pictureIcon}/>
                                    </IconButton>,
                            }}
                        />
                        <TextField label="Upload Car Pictures..." variant="outlined" disabled required className={classes.submitTextField}
                            value={values.carPictures}
                            onChange={handleChange('carPictures')}
                            InputProps={{
                                endAdornment:
                                    <IconButton onClick={null}>
                                        <AddAPhotoRounded className={classes.pictureIcon} />
                                    </IconButton>,
                            }}
                        />
                        
                    </Grid>

                    <Grid container direction="row">
                        <TextField 
                            value={values.carDescription}
                            onChange={handleChange('carDescription')}
                            label="Additional Description (Optional)" variant="outlined" fullWidth multiline rows={5} className={classes.submitDesc}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions className={classes.buttonContainer}>
                <Button className={classes.buttonClose} onClick={handleClose}>
                    Cancel
                </Button>
                <Button className={classes.buttonSubmit} onClick={submit}>
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
        titleItem: {
            paddingBottom: theme.spacing(1.5),
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5)
        },
        submitItem: {
            
        },
        submitTextField: {
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
            paddingBottom: theme.spacing(1.5),
            width: '50%',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                paddingBottom: theme.spacing(1.5),
            },
        },
        pictureItem: {
            
        },
        pictureIconButton: {
            width: 10
        },
        pictureIcon: {
            fontSize: 32,
            color: theme.palette.secondary.main
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

        //////////////////////////////

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