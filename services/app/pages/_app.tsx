import type { AppProps } from 'next/app';
import Head from 'next/head';
import BaseStyles from '../source/base/BaseStyles';
import Footer from '../source/components/Footer';
import addBasePath from '../source/helpers/addBasePath';
import SiteContainer from '../source/layouts/SiteContainer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseStyles />
      <Head>
        <title>Forum One Next.js Starter App</title>
        <meta
          name="description"
          content="Next app using TypeScript and Emotion"
        />
        <link rel="icon" href={addBasePath('/favicon.ico')} />
      </Head>
      <SiteContainer>
        <Component {...pageProps} />
        <Footer />
      </SiteContainer>
    </>
  );
}
export default MyApp;