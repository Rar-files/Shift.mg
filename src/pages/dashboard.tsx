import type { NextPage } from 'next'
import styled from 'styled-components';

const Sh1 = styled.h1`
  font-size: 1rem;
`;

const Dashboard: NextPage = () => {
  return (
    <main>
        <Sh1> Dashboard</Sh1>
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
