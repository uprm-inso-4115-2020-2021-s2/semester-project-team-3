import React, { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import NavBar from '../ui-components/navbar';
import { UserProvider } from '../hooks/context/userProvider'

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [user, setUser] = useState(null)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    setUser(JSON.parse(sessionStorage.getItem('user')))
  }, []);

  return (
    <>
      <Head>
        <title>PonPon</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <UserProvider user={user}>
          <CssBaseline/>
          <NavBar/>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
