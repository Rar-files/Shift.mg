import { Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        {/* <meta httpEquiv='Content-Security-Policy' content="script-src *" />
        <meta httpEquiv='Content-Security-Policy' content="style-src *" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
