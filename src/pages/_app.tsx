import { ApolloProvider } from "@apollo/client";
import { Layout } from "../layout/Layout.tsx";
import "@/styles/globals.css";
import apolloClient from "../lib/apolloClient";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
