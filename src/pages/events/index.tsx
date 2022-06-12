import type { NextPage } from 'next'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app'
import EventsList from '../../components/Events/EventsList'
import Loading from '../../components/Loading'
import {loadEventsForUser} from '../../features/event/eventSlice'
import Button from "@material-ui/core/Button";
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search'
import router from 'next/router'

const EventsPage = styled.div`
    margin: 16px;
`;

const CreateButtonDiv = styled.div`
    margin: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: 40px;
    gap: 10px;
`;

const CreateButton = styled(Button)`
`;

const SearchButton = styled(Button)`
`;


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
        <EventsPage>
            {eventState.loaded
            ? <>
                <CreateButtonDiv>
                    <CreateButton variant="contained" color="primary" size="small" aria-label="Create" onClick={() => router.push("/events/create")}>
                        <AddBoxIcon fontSize="small" />
                        Create
                    </CreateButton>
                    <SearchButton variant="contained" color="primary" size="small" aria-label="Create" onClick={() => router.push("/events/search")}>
                        <SearchIcon fontSize="small" />
                        Search
                    </SearchButton>
                </CreateButtonDiv>
                <EventsList events={eventState.data.items} />
            </>
            : <Loading/>
            }
        </EventsPage>
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
