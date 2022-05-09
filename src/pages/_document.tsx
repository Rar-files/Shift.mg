import { Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <style>{`
          html, body, #__next {
            height: 100%;
          }
        `}</style>
        <link
            href="https://fonts.googleapis.com/css2?family=Alata&display=swap"
            rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
