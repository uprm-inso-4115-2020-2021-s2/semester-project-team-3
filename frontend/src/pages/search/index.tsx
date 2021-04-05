import React from "react"
import Link from "next/link";
import { Box, Button, Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";

export default function Index(){
    const classes = useStyles();

    const l1 = "<"
    const l2 = "<<"
    const r1 = ">"
    const r2 = ">>"

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

                    </Grid>

                    <Grid container direction='row' justify="center">
                        <Grid item>
                            <Button>
                                <Typography variant='h4'>{l2}</Typography>   
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button>
                                <Typography variant='h4'>{l1}</Typography> 
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button disabled classes={{root: classes.inputRoot, disabled: classes.disabled}}>
                                <Typography variant='h4'>0</Typography>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button>
                                <Typography variant='h4'>{r1}</Typography> 
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button>
                                <Typography variant='h4'>{r2}</Typography> 
                            </Button>
                        </Grid>
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