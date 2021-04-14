import React from 'react'
import { Button, Grid, Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import {GoogleLoginResponse, useGoogleLogin}  from 'react-google-login'
import {logIn} from '../../../requests'
import { useUser } from '../../../hooks/useUser'

interface GoogleLoginButton {
    sucessCallBack: (res) => void
    failureCallBack: (res) => void
}

export default function GoogleLoginButton() {

    const {setUser} = useUser()

    const {signIn, loaded} = useGoogleLogin({
        clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        onSuccess:async (res:GoogleLoginResponse)=>{
  
            logIn({
                access_token:res.accessToken, 
                provider: 'google'
            }).then(result => {
                setUser(result)
                sessionStorage.setItem('access_token', res.accessToken)
                sessionStorage.setItem('user', JSON.stringify(result))
                refreshTokenSetup(res)
            }).catch(err => alert("Unable to log in"))
            
        },
        cookiePolicy:'single_host_origin',
        onFailure:(res)=>{alert("Unable to log in")},
    })

    const refreshTokenSetup = (res:GoogleLoginResponse) => {
        
        let refreshTiming = (res.tokenObj.expires_in || 3600 -5 *60)*1000

        const refreshToken = async () => {
            const newAuthRes = await res.reloadAuthResponse()
            refreshTiming = (newAuthRes.expires_in || 3600 -5 *60)*1000
            let lastToken = sessionStorage.getItem('access_token')
            if (lastToken) {
                sessionStorage.setItem('access_token', newAuthRes.access_token)
                setTimeout(refreshToken, refreshTiming)
            }
        }

        setTimeout(refreshToken, refreshTiming)

    }

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
            marginLeft: -10,
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