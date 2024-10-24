import { Box } from "@mui/material";
import "../styles/global.css";
import Head from "next/head";
import '../styles/movieScreen.module.css';
import '../i18n';
export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        {/* Import a font for the App */}
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh', // Make the Box take at least full height of the viewport
        }}
      >
        <Box sx={{ flex: 1 }}> {/* This Box takes up remaining space */}
          <Component {...pageProps} />
        </Box>
        <Box
          component="img"
          src="/bottomImage.png" // I am using the bottom Image like a footer 
          alt="Bottom Image"
          sx={{
            width: '100%',
            objectFit: 'cover', // Ensures the image covers the space
          }}
        />
      </Box>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
