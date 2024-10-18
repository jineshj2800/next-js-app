import { ApolloProvider } from "@apollo/client";
import "@/styles/globals.css";
import apolloClient from "../lib/apolloClient";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
