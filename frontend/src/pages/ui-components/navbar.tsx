import { AppBar, Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, fade, Grid, IconButton, InputBase, makeStyles, Slide, Theme, Typography } from "@material-ui/core";
import { CloseRounded } from '@material-ui/icons';
import Link from "next/link";
import React from "react";
import { useTheme } from '@material-ui/core/styles';
import { TransitionProps } from "@material-ui/core/transitions/transition";
import GoogleLoginButton from "./google-login/google-login";


export default function NavBar() {  
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false)

    const logOpen = () => {setOpen(true)}
    const logClose = () => {setOpen(false)}

    // const Transition = React.forwardRef(function Transition(
    //     props: TransitionProps & { children?: React.ReactElement<any, any> },
    //     ref: React.Ref<unknown>,
    //     ) {
    //     return <Slide direction="down" ref={ref} {...props} />;
    //     }
    // );

    return(
        <AppBar position='relative' className={classes.main}>         
            <Grid container direction='row' wrap="nowrap" justify='space-between'>
                
                <Grid item className={classes.iconItem}>
                    <Link href="/">
                        <Button className={classes.iconButton}>
                            {/* <img className={classes.icon} src="/logoIcon.png"/> */}
                            <Typography className={classes.logoText}>
                                PonPon
                            </Typography>
                        </Button>
                    </Link>
                </Grid>

                <Grid item className={classes.searchItem}>
                    <Grid container direction="column" justify="center">
                        <Grid item className={classes.search}>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Grid>
                    </Grid>      
                </Grid>

                <Grid item className={classes.logInItem}>
                    <Button className={classes.logInButton} onClick={logOpen}>
                        <Typography className={classes.logInText} noWrap>
                            Log In!
                        </Typography>
                    </Button>
                </Grid>

            </Grid>

            <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={logClose}
            >
                <Grid container direction="column" alignItems="center" className={classes.dialogContainer}>

                    <Grid item className={classes.dialogClose}>
                        <Grid container direction="row" justify='flex-end'>
                            <Grid item>
                                <IconButton onClick={logClose}>
                                    <CloseRounded className={classes.closeButton}></CloseRounded>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item className={classes.dialogBody}>
                        <Typography className={classes.Title}>PonPon</Typography>
                        <Typography className={classes.subTitle}>Sign up or Log in</Typography>
                        <Typography className={classes.subTitle}>to access our services.</Typography>
                    </Grid>

                    <Grid item className={classes.dialogButtons}>
                        <Grid container direction="column" alignItems="center">

                            <Grid item className={classes.columnItem}>
                                <GoogleLoginButton />
                            </Grid>
                            
                            <Grid item className={classes.columnItem}>
                                <Button className={classes.buttonFacebook}>
                                    <Grid container direction="row" justify='center' alignItems="center" id="Facebook-Sign-In">
                                        <Grid item className={classes.facebookIconItem}>
                                            <img src="/Facebook_F.png" className={classes.facebookIcon}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.buttonTextFacebook}>Sign In With Facebook</Typography>
                                        </Grid>
                                    </Grid>
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>

            </Dialog>
        </AppBar>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconItem: {
            alignItems: 'left',
        },
        iconButton: {
            width: 150,
            height: 50,
        },
        icon: {
            width: '100%',
            height: '100%',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.65),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.40),
            },
            width: '100%',
            // marginLeft: '6.5%',
            [theme.breakpoints.up('sm')]: {
                width: 325,
            },
        },
        buttons: {
            color: theme.palette.primary.contrastText,
            wrap: 'noWrap'
        },
        accountContainer: {
            width: 190,
        },
        accountEmail: {
            width: 185,
            paddingRight: theme.spacing(1),
        },
        accountCircle: {
            marginTop:theme.spacing(0.5),
        },


////////////////////////////////////////////////////////////////////
        main: {
            zIndex:10,
            boxShadow: 'none',
            color: 'transparent',
            backgroundColor: theme.palette.secondary.main,
        },
        logoText: {
            fontSize: 24,
            color: theme.palette.secondary.contrastText
        },
        logInButton: {
            width: 150,
            height: 50,
        },
        logInText: {
            color: theme.palette.secondary.contrastText,
            fontSize: 24
        },
        inputRoot: {
            color: theme.palette.info.contrastText,
            padding: 4
        },
        inputInput: {
            padding: 8,
            paddingLeft: 40,
            width: '100%',
        },
        searchItem: {
            paddingTop: 4,
            paddingBottom: 6
        },
        logInItem: {
            alignItems: 'left',
        },



        dialogContainer: {
            minWidth: 350,
            minHeight: 500,
        },
        dialogClose: {
            width: '100%',
        },
        closeButton: {
            fontSize: 30,
            // color: theme.palette.secondary.light,
        },
        dialogBody: {
            

        },
        dialogButtons: {
            width: '100%',
            paddingLeft: 32,

        },
        columnItem: {
            width: '100%',
            height: '100%',
            paddingBottom: 8,
        },
        googleIconItem: {
            width: 40,
            height: 40,
            
        },
        facebookIconItem: {
            width: 40,
            height: 40,
        },
        googleIcon: {
            width: '100%',
            height: '100%',
        },
        facebookIcon: {
            width: '100%',
            height: '100%',
        },
        buttonTextGoogle: {
            color: theme.palette.secondary.contrastText,
            paddingLeft: 35
        },
        buttonTextFacebook: {
            color: theme.palette.secondary.contrastText,
            paddingLeft: 20
        },
        buttonGoogle: {
            backgroundColor: theme.palette.secondary.main,
            width: '90%',
            padding: 8,
        },
        buttonFacebook: {
            backgroundColor: theme.palette.primary.main,
            width: '90%',
            padding: 8,
        },
        Title: {
            fontSize: 40,
            color: theme.palette.secondary.main
        },
        subTitle: {
            fontSize: 22,
            color: theme.palette.secondary.main
        },
    }),
);