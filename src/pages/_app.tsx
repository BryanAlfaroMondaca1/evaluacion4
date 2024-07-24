// pages/_app.tsx


<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />


import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS globalmente
import '../styles/styles.css'; // Importa tu archivo de estilos globales
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
