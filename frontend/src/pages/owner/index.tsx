import React from "react"
import Link from "next/link";
import { Box, Button, Card, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";

export default function Index(){
    const classes = useStyles();

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

                <Grid item xs={12} sm={6}>
                    <Grid container justify="center" style={{padding:4}}>
                        <Card className={classes.cardContainer}>
                            <Grid container direction='column' alignItems="center" wrap="nowrap" className={classes.cardContent}>

                                <Grid item>
                                    <Typography variant='h4'>
                                        Select a Vehicle
                                    </Typography>
                                </Grid>

                                <Grid item className={classes.cardItem}>

                                </Grid>   

                            </Grid>
                        </Card>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Grid container justify="center" style={{padding:4}}>
                        <Card className={classes.cardContainer}>  
                            <Grid container direction='column' alignItems="center" wrap="nowrap" className={classes.cardContent}>

                                <Grid item>
                                    <Typography variant='h4'>
                                        Reviews
                                    </Typography>
                                </Grid>

                                <Grid item className={classes.cardItem}>
                                
                                </Grid>   

                            </Grid>
                        </Card>
                    </Grid>
                </Grid>

            </Grid>
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
            maxWidth:800,
            width:"100%",
            marginBottom:30,
            backgroundColor: theme.palette.primary.main,
        },
        cardContent: {
            padding: theme.spacing(4),
            width: '100%',
        },
        cardItem: {
            marginTop: 30,
            width: '95%',
        },
    }),
);