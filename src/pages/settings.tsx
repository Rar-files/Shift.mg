import type { NextPage } from 'next'
import Layout from '../components/Layout'

const Settings: NextPage = () => {
  return (
    <main>
        <h1>Settings</h1>
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
export default Settings
