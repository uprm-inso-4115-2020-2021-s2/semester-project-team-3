import React from "react"
import Link from "next/link";
import { Box, Button, ButtonBase, Card, createStyles, Grid, makeStyles, Slide, Theme, Typography } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import CarouselButtonItem from "../ui-components/carouselButtonItem";

export default function Index(){
   const classes = useStyles();

   return(
      <>
      <Box width="100%" position="absolute" top={0}>
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

            <Grid item md={6} xs={12}>
               <Grid container justify="center" style={{padding:4}}>
                  <Card className={classes.cardContainer}>
                     <Grid container direction='column' alignItems="center" wrap="nowrap" className={classes.cardContent}>

                        <Grid item>
                           <Typography variant='h4'>
                              <u>Recently Added</u>
                           </Typography>
                        </Grid>

                        <Grid item className={classes.cardItem}>
                           <Carousel
                              className={classes.carousel}
                              fullHeightHover
                              stopAutoPlayOnHover
                              animation="slide"
                           >
                              <CarouselButtonItem/>
                              <CarouselButtonItem/>
                              <CarouselButtonItem/>
                           </Carousel>
                        </Grid>   

                     </Grid>
                  </Card>
               </Grid>
            </Grid>

            <Grid md={6} xs={12} item>
               <Grid container justify="center" style={{padding:4}}>
                  <Card className={classes.cardContainer}>  
                     <Grid container direction='column' alignItems="center" wrap="nowrap" className={classes.cardContent}>

                        <Grid item>
                           <Typography variant='h4'>
                              <u>Most Popular</u>
                           </Typography>
                        </Grid>

                        <Grid item className={classes.cardItem}>
                           <Carousel
                              className={classes.carousel}
                              fullHeightHover
                              stopAutoPlayOnHover
                              animation="slide"
                           >
                              <CarouselButtonItem/>
                              <CarouselButtonItem/>
                              <CarouselButtonItem/>
                           </Carousel>
                        </Grid>  

                     </Grid>
                  </Card>
               </Grid>
            </Grid>

            <Grid item>

               <Link href="/listingForm">
                  <Button>Listing Form</Button>
               </Link>

               <Link href="/listing">
                  <Button>Listing Page</Button>
               </Link>

               <Link href="/owner">
                  <Button>Owner Page</Button>
               </Link>

               <Link href="/request">
                  <Button>Request Page</Button>
               </Link>

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
         height:485,
         opacity:0.575,
         objectFit:'cover', 
         position:"relative", 
         zIndex:-100,
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
         marginTop: 150,
         paddingRight: theme.spacing(2),
         paddingLeft: theme.spacing(2),
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
      carousel: {
         width: '100%',
         height: 450,
         position: 'relative',
         zIndex: 1000
      },


   }),
);