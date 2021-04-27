import React from "react"
import Link from "next/link";
import { Box, Button, Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

export default function Index(){
    const classes = useStyles();

    return(
        <Grid container direction="column" alignItems="center" className={classes.main}>
            <Card className={classes.cardContainer}>
                <Grid container direction="row" className={classes.cardContent}>

                    <Grid item>
                        <Typography variant='h4'>
                            <u>Result: No Matches for "Pogchamp"</u>
                        </Typography>
                    </Grid>

                    <Grid item> 
                        {/*vvv  items go here  vvv*/}

                    </Grid>

                    <Grid container direction='row' justify="center" wrap="nowrap">
                        <Pagination count={10} variant="outlined" shape="rounded" color="secondary" siblingCount={1}/>
                    </Grid>

                </Grid>
            </Card>
        </Grid>
    )
        
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({    
        main: {
            padding: 40,
        },
        cardContainer: {
            width:"100%",
            height: "100%",
            backgroundColor: theme.palette.primary.main,
        },
        cardContent: {
            padding: theme.spacing(6),
        },
        inputRoot: {
            "&$disabled": {
              color: theme.palette.common.black
            }
        },
        disabled: {},
   }),
);