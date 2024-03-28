import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Solana Starter Lite</title>
      </Head>

      <ContextProvider>
        <div className='flex flex-col h-screen  bg-[#070707]'>
          <Notifications />
          <AppBar />
          <ContentContainer>
            <div className='flex flex-col justify-center items-center h-screen w-screen'>
            <Component {...pageProps} />
            </div>
          </ContentContainer>
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
