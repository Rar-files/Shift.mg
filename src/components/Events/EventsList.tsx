import { FC } from "react";
import styled from "styled-components";
import {FixedSizeList} from "react-window";
import EventListElement from "./EventListElement";
import EventBlock from "./EventBlock";
import { IEvent as Event } from "../../interfaces/IEvent";

const List = styled(FixedSizeList)`
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 10px;
`;

type EventListProps = {
    events: Event[] | null;
};

const EventsList: FC<EventListProps> = (EventListProps) => {

    if (EventListProps.events !== null) {
        const dataList = EventListProps.events as Event[]

        return (
            <List
                height={Math.max(
                    document.documentElement.clientHeight,
                    window.innerHeight || 0
                )}
                itemCount={1000}
                itemSize={366}
                width="100%"
            >
                {({index}) => 
                    // <EventListElement event={dataList[index]}/>
                    <EventBlock event={dataList[index]}/>
                }
                
            </List>

        );
    }

    return (
        <h1>
            Null
        </h1>
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