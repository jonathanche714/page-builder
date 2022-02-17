import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { AppProvider } from './context';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to admin-nextjs!</title>
      </Head>
      <main className="app">
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </main>
    </>
  );
}

export default CustomApp;
