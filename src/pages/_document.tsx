import { Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <style>{`
          html, body, #__next {
            height: 100%;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
