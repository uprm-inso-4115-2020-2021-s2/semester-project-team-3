import { Button, ButtonBase, Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import React from "react";


export default function OwnerListingItem(){
    const classes = useStyles();

    return(
        <Grid container direction="row" className={classes.main}>
            <ButtonBase className={classes.mainButton} onClick={null}>
                <Card className={classes.mainCard}>
                    
                    <Grid container direction="row" wrap="nowrap" className={classes.cardContent}> 
                        
                        <Grid item>
                            <img src="/Facebook_F.png" className={classes.image}/>
                        </Grid>

                        <Grid item className={classes.textContainerItem}>
                            <Grid container direction="column" alignItems="flex-start" className={classes.textContainer}>
                                <Typography noWrap className={classes.listingText}>
                                    Title:
                                </Typography>

                                <Typography noWrap className={classes.listingText}>
                                    Model: 
                                </Typography>

                                <Typography noWrap className={classes.listingText}>
                                    Location: 
                                </Typography>

                                <Typography noWrap className={classes.listingText}>
                                    Day Rate: 
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>

                </Card>
            </ButtonBase>
        </Grid>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            width: '95%',
            paddingBottom: theme.spacing(1.5),
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

    }),
);