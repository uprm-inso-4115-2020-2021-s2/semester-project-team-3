import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import NavBar from './ui-components/navbar';
import { UserProvider } from '../hooks/context/userProvider'
import fetchUser, { FetchUserRequest } from '../requests/fetchUser'
import { IUser } from '../hooks/useUser';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [user, setUser] = React.useState<IUser | null>(null)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if (sessionStorage.getItem("access_token")) {
       
      fetchUser({access_token: sessionStorage.getItem("access_token")})
      .then(result => {
        console.log(result)
        setUser(result)
      })
      .catch(err => {
        setUser(null)
      })
    }
  
  }, []);

  return (
    <>
      <Head>
        <title>PonPon</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <UserProvider user={null}>
          <CssBaseline/>
          <NavBar/>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
