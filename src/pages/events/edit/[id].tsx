import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'


const EditEventPage = styled.div``;

const EditEvent: NextPage = () => {

    const router = useRouter()
    const { id } = router.query

    return (
        <main>
            <EditEventPage>
                {id}
            </EditEventPage>
        </main>
    )
}

export default EditEvent
