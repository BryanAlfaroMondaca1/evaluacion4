// pages/_app.tsx

import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS globalmente

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
