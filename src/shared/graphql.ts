import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import type { NormalizedCacheObject } from "@apollo/client/core";

const httpUrl: string = 'http://localhost:5000/graphql';

const httpLink: ApolloLink = createHttpLink({
  uri: httpUrl,
  credentials: "include",
});

const cache: InMemoryCache = new InMemoryCache({
  addTypename: false,
});

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true, // turn false in production
});

export { apolloClient };
