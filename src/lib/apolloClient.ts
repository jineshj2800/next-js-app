import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

// named request
const MY_BASE_URL = "https://rickandmortyapi.com/graphql";
const httpLink = new HttpLink({ uri: MY_BASE_URL });
const namedLink = new ApolloLink((operation, forward) => {
  operation.setContext(() => ({
    uri: `${MY_BASE_URL}?${operation.operationName}`,
  }));
  return forward ? forward(operation) : null;
});

const makeCreateGraphQLClient = () => {
  let graphQLInstance;
  return (): ApolloClient<any> => {
    if (!graphQLInstance) {
      graphQLInstance = new ApolloClient({
        ssrMode: true,
        link: ApolloLink.from([namedLink, httpLink]),
        cache: new InMemoryCache(),
        assumeImmutableResults: true,
        connectToDevTools: true,
        defaultOptions: {
          watchQuery: {
            fetchPolicy: "cache-and-network",
            nextFetchPolicy: "cache-first",
          },
        },
      });
    }
    return graphQLInstance;
  };
};

export default makeCreateGraphQLClient();
