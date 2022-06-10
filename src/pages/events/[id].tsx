import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'


const EventPage = styled.div``;

const Event: NextPage = () => {

    const router = useRouter()
    const { id } = router.query

    return (
        <main>
            <EventPage>
                {id}
            </EventPage>
        </main>
    )
}

export default Event
