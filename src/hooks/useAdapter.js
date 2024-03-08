import { useMemo } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

export const useAdapter = () => {
  const apiBase = "http://localhost:4000";

  const authLink = useMemo(
    () =>
      setContext((_, { headers }) => {
        const token = localStorage.getItem("token_festiapp_signin");

        return {
          headers: {
            ...headers,
            authorization: token ? `${token}` : "",
          },
        };
      }),
    []
  );

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = useMemo(() => {
    // Agrega el return aquí
    return createHttpLink({
      uri: apiBase,
      fetchOptions: {
        mode: "cors",
      },
      credentials: "same-origin",
    });
  }, [apiBase]);

  const apolloLink = useMemo(
    () => ApolloLink.from([authLink, errorLink, httpLink]),
    [authLink, errorLink, httpLink]
  );

  const newApolloClient = new ApolloClient({
    link: apolloLink,
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
  });

  return {
    newApolloClient,
  };
};
