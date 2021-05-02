import { Button, ButtonBase, Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import React from "react";


export default function OwnerReviewItem(){
    const classes = useStyles();

    return(
        <Grid container direction="row" className={classes.main}>
            <ButtonBase className={classes.mainButton} onClick={null}>
                <Card className={classes.mainCard}>
                    
                    <Grid container direction="row" wrap="nowrap" justify="space-between" className={classes.cardContent}> 

                        <Grid item xs={10} className={classes.textContainerItem}>
                            <Typography noWrap className={classes.listingText}>
                                Review text Review text Review text Review text Review text Review text Review text 
                            </Typography>
                        </Grid>

                        <Grid item xs={2} className={classes.textContainerItem}>
                            <Typography noWrap className={classes.rating}>
                                10/10
                            </Typography>
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
        textContainerItem: {

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
            paddingBottom: theme.spacing(1),
        },
        rating: {
            fontSize: 20,
        },

    }),
);