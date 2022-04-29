import type { NextPage } from 'next'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app'
import EventsList from '../components/Events/EventsList'
import Loading from '../components/Loading'
import { loadEventsData } from '../features/event/eventSlice'

const EventsPage = styled.div``;

const Events: NextPage = () => {
  const dispatch = useAppDispatch();
  const eventState = useAppSelector(state => state.event)
  console.log(eventState)

  useEffect(() => { 
    dispatch(loadEventsData())
  }, [dispatch])

  return (
    <main>
        {eventState.loaded == true 
          ? <EventsPage>
              <EventsList events={eventState.data as Event[] | null} />
          </EventsPage>
          : <Loading/>
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

export default Events
