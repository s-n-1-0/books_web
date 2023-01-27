/* eslint-disable @next/next/next-script-for-ga */
import { Head, Html, Main, NextScript } from "next/document";

const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-itunes-app" content="app-id=1663611616" />
        {/*<!-- Google tag (gtag.js) -->*/}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZXZSD62930"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZXZSD62930');`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
