import type { AppProps } from "next/app";
import Head from "next/head";
import "../../public/globals-client.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Welcome to apps/client-next!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
