import type { NextPage } from 'next'
import {Backdrop, Box, CircularProgress, Container, Paper} from "@material-ui/core";
import {Calendar} from "react-big-calendar";
import {luxonLocalizer} from "react-big-calendar";
import {DateTime} from "luxon";
import {getUserEvents, GetUserEventsFilters} from "../app/services/event/EventService";
import {useAppDispatch, useAppSelector} from "../app";
import {useEffect, useState} from "react";
import CalendarComponent from '../components/Calendar';
import styled from 'styled-components';
import EventsList, { ViewType } from '../components/Events/EventsList';
import { loadIcons } from '../features/event/iconSlice'
import { loadEventsForUser } from '../features/event/eventSlice';
import Loading from '../components/Loading';
import router from 'next/router';

const HomeDiv = styled.div`
    margin: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Dashboard: NextPage = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(state => state.user);
    const eventState = useAppSelector(state => state.event);

    const goToDetails = (id: string) => {
        router.push(`/events/${id}`);
    };

    useEffect(() => {
        if (userState.data === undefined) {
            return;
        }
        
        dispatch(loadIcons());
        dispatch(loadEventsForUser(userState.data!.id))
    }, [dispatch, userState.data])

    return (
        <HomeDiv>
            <Container>
                {eventState.loaded
                    ?<EventsList view={ViewType.tiles} events={eventState.data.items} onEventClick={goToDetails}/>
                    :<Loading/>
                }
            </Container>
            <Container>
                <CalendarComponent />
            </Container>
        </HomeDiv>
    );
}

export async function getStaticProps() {
    return {
        props: {
            protected: true,
        },
    }
}

export default Dashboard
