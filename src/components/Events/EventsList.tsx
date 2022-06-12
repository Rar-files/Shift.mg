import { FC } from "react";
import styled from "styled-components";
import {FixedSizeList} from "react-window";
import EventBlock from "./EventBlock";
import {IEvent} from "../../interfaces/IEvent";

const List = styled(FixedSizeList)`
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 10px;
`;

type EventListProps = {
    events: IEvent[];
};

const EventsList: FC<EventListProps> = (props) => {
    return (
        <>
            { props.events.length > 0 && props.events.map((element, index) => (
                <EventBlock key={index} event={element}/>
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
