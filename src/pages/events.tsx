import type { NextPage } from 'next'
import Layout from '../components/Layout'

const Events: NextPage = () => {
  return (
    <main>
        <h1>Events</h1>
    </main>
  )
}

export async function getStaticProps() {
    return {
        props: {
            protected: true,
        },
    }
}

export default Events
