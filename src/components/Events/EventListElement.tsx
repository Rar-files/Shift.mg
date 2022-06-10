import { FC } from "react";
import styled from "styled-components";
import { IEvent as Event } from "../../interfaces/IEvent";

const Element = styled.div`
    background-color: none;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-color: ${props => props.theme.palette.divider};
    border-style: solid;
    border-width: 0 0 1px 0;
`;

type EventListElementProps = {
    event: Event;
};

const EventListElement: FC<EventListElementProps> = (EventListElementProps) => {
    return (
        <Element>
            
        </Element>   
    )
}

export default EventListElement;