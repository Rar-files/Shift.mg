import type { NextPage } from 'next'
import EventBlock from '../components/Events/EventsList/EventTile';

const Home: NextPage = () => {

    return (
        <main>

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

export default Home
