import { SearchGoogleBooksModalContextProvider } from "@/components/providers/SearchGoogleBooksModalContextProvider";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchGoogleBooksModalContextProvider>
      <Component {...pageProps} />
    </SearchGoogleBooksModalContextProvider>
  );
}

export default MyApp;
