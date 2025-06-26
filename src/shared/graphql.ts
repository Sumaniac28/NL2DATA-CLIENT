import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import type { NormalizedCacheObject } from "@apollo/client/core";

const httpUrl: string = import.meta.env.VITE_BASE_ENDPOINT;

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
  connectToDevTools: import.meta.env.VITE_ENVIRONMENT === "development",
});

export { apolloClient };
