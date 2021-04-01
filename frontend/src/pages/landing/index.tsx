import React from "react"
import Link from "next/link";
import { Box, Button, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";

export default function Index(){
   const classes = useStyles();

   return(
      <>
      <Box width="100%" height="100%" position="absolute" top={0}>
         <img src="/backgroundImage.png" className={classes.backImage}/>
      </Box>

      <Grid container direction="column" alignItems="center" className={classes.main}>

         <Grid item>
            <Typography className={classes.title}>
               PonPon
            </Typography>
         </Grid>

         <Grid item className={classes.subtitle} style={{textAlign:"center"}} >
            <Typography variant="h5" style={{textAlign:"center"}}>
               Making rentals much easier.<br />
               Book an appointment for a car near you today!
            </Typography>
         </Grid>

         <Grid item className={classes.buttonSearchItem}>
            <Button variant="contained" className={classes.buttonSearch} onClick={null}>
               Start Now!
            </Button>
         </Grid>

         <Grid container direction='row' justify="space-around" alignContent="center" className={classes.gridMainContent}>

         <Grid item>
            <Link href="/lform">
               <Button>Listing Form</Button>
            </Link>
         </Grid>

         <Grid item>
            <Link href="/listing">
               <Button>Listing Page</Button>
            </Link>
         </Grid>

         <Grid item>
            <Link href="/owner">
               <Button>Owner Page</Button>
            </Link>
         </Grid>

         <Grid item>
            <Link href="/request">
               <Button>Request Page</Button>
            </Link>
         </Grid>

         <Grid item>
            <Link href="/search">
               <Button>Search Page</Button>
            </Link>
         </Grid>

         </Grid>

         

      </Grid>
      </>
   )     
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({    
      backImage: {
         width:"100%",
         height: "100%",
         opacity:0.575,
         objectFit:'cover', 
         position:"relative", 
         zIndex:-100,
         marginTop: -470
      },
      main: {
         marginTop: 70,
      },
      title: {
         color: theme.palette.secondary.main,
         fontSize: 80,
         [theme.breakpoints.down('sm')]:{
             fontSize: 70
         }
      },
      subtitle: {
         paddingBottom: theme.spacing(1),
         color: theme.palette.secondary.main,
      },
      buttonSearchItem: {
         paddingTop: theme.spacing(1),
      },
      buttonSearch: {
         color: theme.palette.secondary.contrastText,
         backgroundColor: theme.palette.secondary.main,
      },

      //////////////////////////////////////////////////////

      gridMainContent: {
         marginTop: 150
      },

   }),
);