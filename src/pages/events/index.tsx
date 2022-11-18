import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app'
import Loading from '../../components/Loading'
import {loadEventsForUser} from '../../features/event/eventSlice'
import {Button, IconButton} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search'; 
import ViewComfy from '@material-ui/icons/ViewComfy';
import CalendarViewDay from '@material-ui/icons/CalendarViewDay';
import router from 'next/router'
import { loadIcons } from '../../features/event/iconSlice'
import EventList from "../../components/Events/EventsList/EventList";
import EventTiles from "../../components/Events/EventsList/EventTiles";

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

const ViewButton = styled(IconButton)`
`;

const EventsDiv = styled.div`
`;

enum ViewType {
    list = 1,
    tiles = 2
}


const Events: NextPage = () => {
    const dispatch = useAppDispatch();
    const eventState = useAppSelector(state => state.event);
    const userState = useAppSelector(state => state.user);

    const [view, setView] = useState(ViewType.tiles);

    useEffect(() => {
        if (userState.data === undefined) {
            return;
        }
        
        dispatch(loadIcons());
        dispatch(loadEventsForUser(userState.data!.id))
    }, [dispatch, userState.data])

    const goToDetails = (id: string) => {
        router.push(`/events/${id}`);
    };

    return (
        <main>
            <EventsPage>
                {eventState.loaded
                ? <>
                    <CreateButtonDiv>
                        <CreateButton variant="contained" color="primary" size="small" aria-label="Create" startIcon={<AddBoxIcon fontSize="small" />} onClick={() => router.push("/events/create")}>                        
                            Create
                        </CreateButton>
                        <SearchButton variant="contained" color="primary" size="small" aria-label="Search" startIcon={<SearchIcon fontSize="small" />} onClick={() => router.push("/events/search")}>
                            Search
                        </SearchButton>
                        
                        {view == ViewType.list &&
                        
                            <ViewButton  
                                color="primary" 
                                size="small" 
                                onClick={() => setView(ViewType.tiles)}
                            >
                                <CalendarViewDay fontSize="small" />
                            </ViewButton>
                        }

                        {view == ViewType.tiles && 
                        
                            <ViewButton 
                                color="primary" 
                                size="small" 
                                onClick={() => setView(ViewType.list)}
                            >
                                <ViewComfy fontSize="small" />
                            </ViewButton>
                        }

                    </CreateButtonDiv>

                    { eventState.data.items.length > 0 &&
                    <EventsDiv>
                            {view == ViewType.tiles && <EventTiles events={eventState.data.items} onEventClick={goToDetails} />}

                            {view == ViewType.list && <EventList events={eventState.data.items} onEventClick={goToDetails} />}
                    </EventsDiv>
                    }

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
