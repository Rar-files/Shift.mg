import { FC } from "react";
import styled from "styled-components";
import {FixedSizeList} from "react-window";
import EventListElement from "./EventListElement";
import EventBlock from "./EventBlock";
import { IEvent as Event } from "../../interfaces/IEvent";
import IPaginableResponse from "../../app/services/IPaginableResponse";

const List = styled(FixedSizeList)`
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 10px;
`;

type EventListProps = {
    events: IPaginableResponse<Event>;
};

const EventsList: FC<EventListProps> = (props) => {
    return (
        <>
            <h1>
                Null
            </h1>
            {props.events.items.length > 0 && props.events.items.map((element) => (
                <EventBlock event={element}/>
            ))}
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

export default EventsList;
