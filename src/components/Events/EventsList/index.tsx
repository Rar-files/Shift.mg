import { FC } from "react";
import styled from "styled-components";
import {IEvent} from "../../../interfaces/IEvent";
import EventsList from "./EventList";
import EventTiles from "./EventTiles";

const EventsDiv = styled.div`
`;

export enum ViewType {
    list = 1,
    tiles = 2
}

type EventListProps = {
    events: IEvent[];
    view: ViewType
};

const Events: FC<EventListProps> = (props) => {

    return (
        <>
            { props.events.length > 0 &&
                <EventsDiv>
                        {props.view == ViewType.tiles && <EventTiles events={props.events}/>}

                        {props.view == ViewType.list && <EventsList events={props.events}/>}
                </EventsDiv>
            }
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {
            protected: true,
        },
    }
}

export default Events;
