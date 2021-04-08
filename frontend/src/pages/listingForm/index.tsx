import { Button, createStyles, Dialog, Grid, IconButton, InputAdornment, makeStyles, TextField, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { AddAPhotoRounded, PhotoCamera } from "@material-ui/icons";
import React, { useEffect } from "react";
import theme from "../theme";


export default function ListingForm(){
    const classes = useStyles();
    const theme = useTheme();

    const [values, setValues] = React.useState<any>({  //change "any" to "formModel"
        listingTitle: '',
        carBrand: '',
        carModel: '',
        licensePlate: '',
        color: '',
        location: '',
        dayRate: null,
        carDocuments: [],
        carPictures: [],
    });

    const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => { // change "any" to "keyof formModel"
        setValues({ ...values, [prop]: event.target.value });  
    };

    return(
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
                <TextField label="Location" type="search" variant="outlined" required className={classes.submitTextField}
                    value={values.location}
                    onChange={handleChange('location')}
                />
                <TextField label="Day Rate (USD)" type="number" variant="outlined" required className={classes.submitTextField}
                    value={values.dayRate}
                    onChange={handleChange('dayRate')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
            </Grid>

            <Grid container direction="row" className={classes.submitItem}>
                <TextField label="Car Documents" variant="outlined" required className={classes.submitTextField}
                    InputProps={{
                        endAdornment: <InputAdornment position="start"><AddAPhotoRounded className={classes.pictureIcon}/></InputAdornment>,
                    }}
                />
                <TextField label="Car Pictures" variant="outlined" required className={classes.submitTextField}
                    InputProps={{
                        endAdornment: <InputAdornment position="start"><AddAPhotoRounded className={classes.pictureIcon}/></InputAdornment>,
                    }}
                />
            </Grid>

            <Grid container direction="row">
                <TextField label="Additional Description (Optional)" variant="outlined" fullWidth multiline rows={5} className={classes.submitDesc}/>
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
            fontSize: 30,
            color: theme.palette.secondary.main
        },
        submitDesc: {
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
        },
    }),
);