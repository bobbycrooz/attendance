import Head from 'next/head';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Metaversus</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://stijndv.com" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
