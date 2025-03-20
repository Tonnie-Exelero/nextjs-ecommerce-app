"use client"

import type React from "react"

import { useState } from "react"
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
import { useSession } from "next-auth/react"

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [client] = useState(() => createApolloClient(session?.accessToken))

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

function createApolloClient(token?: string) {
  const httpLink = new HttpLink({
    uri: "/api/graphql",
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      )
    if (networkError) console.error(`[Network error]: ${networkError}`)
  })

  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
      mutate: {
        fetchPolicy: "no-cache",
      },
      watchQuery: {
        fetchPolicy: "network-only",
      },
    },
  })
}

