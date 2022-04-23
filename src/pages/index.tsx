import type { NextPage } from 'next'
import {useAppSelector} from "../app";

const Home: NextPage = () => {
    const userState = useAppSelector(state => state.user)

    return (
        <main>
            {userState.loaded &&
                <h1>Witaj, {userState.data?.displayName} ({userState.data?.username})</h1>
            }
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
