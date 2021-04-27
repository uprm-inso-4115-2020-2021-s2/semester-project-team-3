import { CircularProgress, Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, makeStyles, TextField, Theme, Typography, useMediaQuery, useTheme, LinearProgress } from "@material-ui/core";
import { AddAPhotoRounded, LocationSearchingTwoTone, PhotoCamera } from "@material-ui/icons";
import React, { useEffect } from "react";
import GooglePlacesAuto from '../ui-components/google-places/google-places'
import theme from "../../theme";
import createListing from "../../requests/createListing";
import { useUser } from "../../hooks/useUser";
import {mutate} from 'swr';

interface IProps {
    isOpen: boolean,
    handleClose: () => any
}

export default function ListingForm({isOpen, handleClose}:IProps){
    const classes = useStyles();
    const theme = useTheme();
    const {user} = useUser();

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

    const [carImages, setCarImages] = React.useState(null)

    const [carLicenseImage, setCarLicenseImage] = React.useState(null)

    const [loading, setLoading] = React.useState<boolean>(false)

    const submit = async () => {
        setLoading(true)
        let body = {
            licensePlate: values.licensePlate,
            title: values.listingTitle,
            carLocationLat: location.lat,
            carLocationLon: location.lon,
            carLocationAddress: location.address,
            model: values.carModel,
            brand: values.carBrand,
            year:2020,
            carDescription: values.carDescription,
            cancellationFee: 10.00,
            priceRate: values.dayRate,
            accessToken: sessionStorage.getItem('access_token'),
            carImages: carImages,
            carLicenseImage: carLicenseImage
        }
        const result = await createListing(body)
        if (result.success) {
            alert("Created successfully")
            setValues({  //change "any" to "formModel"
                listingTitle: '',
                carBrand: '',
                carModel: '',
                licensePlate: '',
                color: '',
                dayRate: null,
                carDocuments: [],
                carPictures: [],
                carDescription: ''
            })
            setCarImages(null)
            setCarLicenseImage(null)
            handleClose()
        }else {
            alert(result.msg)
        }
        setLoading(false)
        mutate(`ownerProfile/${user?.email}`)
    }

    const handleInputFileCarImage = (e) => {
        setCarImages(e.target.files)
    }

    const handleInputFileCarLicenseImage = (e) => {
        if (e.target.files) {
            setCarLicenseImage(e.target.files[0])
        }
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
            {!loading?(
                <>
                <Grid container direction="row" justify="center">
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
                        <div className={classes.submitTextField}>
                            <Typography>Upload Car Images</Typography>
                            <input type="file" multiple onChange={handleInputFileCarImage}/>
                        </div>
                        
                        <div className={classes.submitTextField}>
                            <Typography>Upload License Image</Typography>
                            <input type="file" onChange={handleInputFileCarLicenseImage}/>
                        </div>
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

                </>
            ): 
            <DialogContent>
                <Grid container direction='row' justify="center">
                    <CircularProgress />
                </Grid>
            </DialogContent>
            }
            
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
            padding: theme.spacing(1),
            marginRight: 10,
        },
        buttonClose: {
            fontSize: 18,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            backgroundColor: "#E53939",
        },
        buttonSubmit: {
            fontSize: 18,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            backgroundColor: "#6ACB73",
        },
    }),
);