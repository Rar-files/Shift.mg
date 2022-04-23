import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  return (
    <main>
        <h1>Dashboard</h1>
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

export default Dashboard
