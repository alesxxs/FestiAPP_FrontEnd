import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { ApolloProvider } from '@apollo/client'
import { RouteGuard } from '@/components/RouteGuard'
import { useAdapter } from '@/hooks/useAdapter'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/app/globals.css"

const MyApp = (props) => {
    const {
        Component,
        pageProps
    } = props

    return (
        <>
            <Head>
                <meta name='viewport' content="initial-scale=1, width=device-width" />
                <title>FestiApp</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default (props) => {
    const {newApolloClient} = useAdapter()

    return (
        <ApolloProvider client={newApolloClient}>
            <RouteGuard>
                <MyApp {...props} />
            </RouteGuard>
        </ApolloProvider>
    )
}