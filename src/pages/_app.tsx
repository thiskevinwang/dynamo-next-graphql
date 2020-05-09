import { AppProps } from "next/app"
import Head from "next/head"
import Router from "next/router"
import { createGlobalStyle, BaseProps } from "styled-components"

import "../../_CerealFont.css"
import "../../_FiraCodeFont.css"
import "../../_global.css"

import { AuthProvider, ColorSchemeProvider, RightPanelProvider } from "context"
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
    background: ${(p: BaseProps) => p.theme.background};
    color: ${(p: BaseProps) => p.theme.text};
    margin: 0;
  }
  ::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
      background: ${(p: BaseProps) => p.theme.muted};
  }
`

const __next = ({ Component, pageProps }: AppProps) => {
  return (
    <ColorSchemeProvider>
      <GlobalStyle />
      <Head>
        <></>
      </Head>
      <AuthProvider>
        <RightPanelProvider>
          <Component {...pageProps} />
        </RightPanelProvider>
      </AuthProvider>
    </ColorSchemeProvider>
  )
}

export default __next
