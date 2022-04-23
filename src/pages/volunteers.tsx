import type { NextPage } from 'next'

const Volunteers: NextPage = () => {
  return (
    <main>
        <h1>Volunteers</h1>
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

export default Volunteers
