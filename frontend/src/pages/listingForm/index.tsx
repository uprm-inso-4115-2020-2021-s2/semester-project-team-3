import { Button, createStyles, Dialog, Grid, IconButton, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React from "react";


export default function ListingForm(){
    const classes = useStyles();

    return(
        <Grid container direction="column" wrap="nowrap" className={classes.main}>

            <Grid container direction="row" className={classes.titleItem}>
                <Grid item>
                    <TextField label="Title" type="search" variant="outlined" fullWidth/>
                </Grid>
            </Grid>

            <Grid container direction="row" className={classes.submitItem}>
                <Grid item>
                    <TextField label="Car Model" type="search" variant="outlined" fullWidth/>
                </Grid>
                <Grid item>
                    <TextField label="Car Brand" type="search" variant="outlined" fullWidth/>
                </Grid>
            </Grid>

            <Grid container direction="row" className={classes.submitItem}>
                <Grid item>
                    <TextField label="License Plate" type="search" variant="outlined" fullWidth/>
                </Grid>
                <Grid item>
                    <TextField label="Color" type="search" variant="outlined" fullWidth/>
                </Grid> 
            </Grid>

            <Grid container direction="row" className={classes.submitItem}>
                <Grid item>
                    <TextField label="Location" type="search" variant="outlined" fullWidth/>
                </Grid>
                <Grid item>
                    <TextField label="Day Rate" type="search" variant="outlined" fullWidth/>
                </Grid>
            </Grid>

            <Grid container direction="row" className={classes.submitItem}>

                <Grid item>
                    <Grid container direction="row" wrap="nowrap" className={classes.submitItem}>
                        <Grid item>
                            <TextField label="Car License Documents" type="search" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item>
                            <IconButton color="primary" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction="row" wrap="nowrap" className={classes.submitItem}>
                        <Grid item>
                            <TextField label="Car Pictures" type="search" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item>
                            <IconButton color="primary" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container direction="row">
                <Grid item>
                    <TextField label="Description" variant="outlined" fullWidth multiline rows={3}/>
                </Grid>
            </Grid>

            <Grid container direction="row" wrap="nowrap" className={classes.buttonContainer}>
                <Grid item>
                    <Button>
                        <Typography variant='h5'>
                            Cancel
                        </Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        <Typography variant='h5'>
                            Submit
                        </Typography>
                    </Button>
                </Grid>  
            </Grid>
            
        </Grid>
    )
        
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {

        },
        titleItem: {

        },
        submitItem: {

        },
        pictureItem: {
            width: '100%',
        },
        buttonContainer: {

        },
    }),
);