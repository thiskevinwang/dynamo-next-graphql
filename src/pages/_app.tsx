import { AppProps } from "next/app"
import Head from "next/head"
import Router from "next/router"
import { createGlobalStyle } from "styled-components"

/**
 * Optional
 * @see https://github.com/zeit/next.js/blob/canary/examples/with-loading/pages/_app.js
 */
Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`)
})
Router.events.on("routeChangeComplete", () => {})
Router.events.on("routeChangeError", () => {})

/**
 * Docs on `public` vs `static` directory
 * @see https://nextjs.org/blog/next-9-1#public-directory-support
 */
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const __next = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <></>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default __next