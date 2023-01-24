import { FC } from "react";
import styled from "styled-components";
import EventTile from "./EventTile";
import {IEvent} from "../../../interfaces/IEvent";

const TilesDiv = styled.div`
    display: flex;;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
`;

const TilesDivWraped = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

type EventListProps = {
    events: IEvent[];
    wrap?: boolean;
    onEventClick: (eventId : string) => void;
};

const EventTiles: FC<EventListProps> = (props) => {

    let Tiles = TilesDiv;

    if(props.wrap)
        Tiles = TilesDivWraped;

    return (
        <Tiles>
            {props.events.map((element, index) => (
                <EventTile key={index} event={element} onEventClick={props.onEventClick}/>
            ))}
        </Tiles>
    )
}

export default EventTiles;
