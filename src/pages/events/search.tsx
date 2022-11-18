import type {NextPage} from 'next'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search'
import {TextField} from "@material-ui/core";
import {useEffect, useState} from "react";
import {IListResponse} from "../../app/services/ApiClient";
import {CreateEventInvite, getEvents} from "../../app/services/event/EventService";
import {IEvent} from "../../interfaces/IEvent";
import EventsList, {ViewType} from "../../components/Events/EventsList";
import { getMembersForEvent } from '../../app/services/event/MemberService';
import router from 'next/router';
import { EventInviteDto } from '../../Dtos/EventInviteDto';
import { useAppSelector } from '../../app';

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

const SearchButton = styled(Button)`
`;

interface SearchEventState {
    loading: boolean;
    keyword: string | null;
    list: IListResponse<IEvent> | null;
}


const SearchEvents: NextPage = () => {
    const [state, setState] = useState<SearchEventState>({loading: true, keyword: null, list: null} as SearchEventState);
    const userState = useAppSelector(state => state.user)

    useEffect(() => {
        if (state.list === null) {
            getEvents().then((promise) => {
                setState({...state, loading: false, list: promise.data} as SearchEventState);
            });
        }
    }, [state]);

    const onSearchClick = () => {
        setState({...state, loading: true});

        getEvents(state.keyword).then((promise) => {
            setState({...state, loading: false, list: promise.data} as SearchEventState);
        });
    };

    const inviteMe = (eventId : string) => {
        console.log(`Invite me: ${eventId}`);

        // getMembersForEvent(eventId).then((promise) =>{
        //     goToDetails(eventId);
        // }).catch((error) => {
        //     let inviteToPost : EventInviteDto = {
        //         userEmail: userState.data.email,
        //         role: userState.data.role.id
        //     }

        //     CreateEventInvite(eventId, inviteToPost).then((response) => {
        //         if (!response.succeeded) {
        //             applyViolationsToForm<IFormInvite>(methods.setError, response.violations);
        //         } else {
        //             onClose();
        //         }
        //     });
        // })
        
    }

    const goToDetails = (id: string) => {
        router.push(`/events/${id}`);
    };

    return (
        <main>
            <EventsPage>
                <CreateButtonDiv>
                    <TextField
                        placeholder="Input event name" onChange={(event) => setState({...state, keyword: event.target.value})}
                    />
                    <SearchButton variant="contained" color="primary" size="small" aria-label="Create" onClick={() => onSearchClick()}>
                        <SearchIcon fontSize="small" />
                        Search
                    </SearchButton>
                </CreateButtonDiv>
                {state.loading &&
                    <Loading/>
                }
                {!state.loading &&
                    <EventsList events={state.list!.items} view={ViewType.list} onEventClick={(eventId) => inviteMe(eventId)}/>
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

export default SearchEvents
