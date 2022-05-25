import type { NextPage } from 'next'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app'
import EventsList from '../components/Events/EventsList'
import Loading from '../components/Loading'
import {loadEventsForUser} from '../features/event/eventSlice'
import { IEvent } from '../interfaces/IEvent'

const EventsPage = styled.div``;

const Events: NextPage = () => {
  const dispatch = useAppDispatch();
  const eventState = useAppSelector(state => state.event);
  const userState = useAppSelector(state => state.user);

  useEffect(() => {
      if (userState.data === undefined) {
          return;
      }

      dispatch(loadEventsForUser(userState.data!.id))
  }, [dispatch, userState.data])

  return (
    <main>
        {eventState.loaded
          ? <EventsPage>
              <EventsList events={eventState.data} />
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
