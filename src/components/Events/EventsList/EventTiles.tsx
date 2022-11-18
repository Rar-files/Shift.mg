import { FC } from "react";
import styled from "styled-components";
import EventTile from "./EventTile";
import {IEvent} from "../../../interfaces/IEvent";

const TilesDiv = styled.div`
    display: flex;
`;

type EventListProps = {
    events: IEvent[];
    onEventClick: (eventId : string) => void;
};

const EventTiles: FC<EventListProps> = (props) => {
    return (
        <TilesDiv>
            {props.events.map((element, index) => (
                <EventTile key={index} event={element} onEventClick={props.onEventClick}/>
            ))}
        </TilesDiv>
    )
}

export default EventTiles;
