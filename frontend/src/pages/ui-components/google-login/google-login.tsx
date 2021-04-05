import React from 'react'
import { Button, Grid, Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import {GoogleLoginResponse, useGoogleLogin}  from 'react-google-login'
import {logIn} from '../../../requests'

interface GoogleLoginButton {
    sucessCallBack: (res) => void
    failureCallBack: (res) => void
}

export default function GoogleLoginButton() {

    const {signIn, loaded} = useGoogleLogin({
        clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        onSuccess:(res:GoogleLoginResponse)=>{
            console.log(res)    
            logIn({
                access_token:res.accessToken, 
                provider: 'google'
            })
            sessionStorage.setItem('access_token', res.accessToken)
        },
        cookiePolicy:'single_host_origin',
        onFailure:(res)=>{console.log(res)},
    })

    const classes = useStyles()

    return (
        <Button
            onClick={signIn}
            className={classes.buttonGoogle}>
            <Grid container direction="row" justify='center' alignItems="center" id="Google-Sign-In">
                <Grid item className={classes.googleIconItem}>
                    <img src="/Google_G.png" className={classes.googleIcon}/>
                </Grid>
                <Grid item>
                    <Typography className={classes.buttonTextGoogle}>Sign In With Google</Typography>
                </Grid>
            </Grid>
        </Button>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonGoogle: {
            backgroundColor: theme.palette.secondary.main,
            width: '90%',
            padding: 8,
        },
        googleIconItem: {
            width: 40,
            height: 40,
        },
        googleIcon: {
            width: '100%',
            height: '100%',
        },
        buttonTextGoogle: {
            color: theme.palette.secondary.contrastText,
            paddingLeft: 35
        }
    }),
);