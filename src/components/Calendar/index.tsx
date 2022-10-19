import {Backdrop, Box, CircularProgress, Container, Paper} from "@material-ui/core";
import {Calendar} from "react-big-calendar";
import {luxonLocalizer} from "react-big-calendar";
import {DateTime} from "luxon";
import {getUserEvents, GetUserEventsFilters} from "../../app/services/event/EventService";
import {useAppSelector} from "../../app";
import {FC, useEffect, useState} from "react";
import { IEvent } from '../../interfaces/IEvent';
import EventWrapper from './EventWrapper';
import router from 'next/router';
import Loading from "../Loading";

// @ts-ignore
const localizer = luxonLocalizer(DateTime, {firstDayOfWeek: 1});

export interface ICalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    color: string;
}

const toCalendarEvent = (event: IEvent): ICalendarEvent => {
    return {
        id: event.id,
        title: event.name,
        start: event.startDate,
        end: event.endDate,
        color: event.color
    }
}

const goToDetails = (id : string) => {
    router.push(`/events/${id}`);
};

const eventPropsGetter = (event : ICalendarEvent,start: Date, end: Date, isSelected : boolean) => {
    var backgroundColor = event.color;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        border: '0px',
        display: 'block'
    };
    
    if(isSelected)
        goToDetails(event.id);

    return {
        style: style
    };
}

const CalendarComponent: FC = () => {
    const userState = useAppSelector(state => state.user);
    const [eventsList, setEventsList] = useState<ICalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const onRangeChange = (range: Date[] | {start: Date, end: Date}) => {
        setLoading(true);
        let filters: GetUserEventsFilters = {
            startDate: new Date(),
            endDate: new Date()
        };

        if (Array.isArray(range)) {
            filters.startDate = range[0];
            filters.endDate = range[range.length-1];
        } else {
            filters.startDate = range.start;
            filters.endDate = range.end;
        }

        getUserEvents(userState.data!.id, filters).then((promise) => {
            if (!promise.succeeded) {
                return;
            }

            setEventsList(promise.data.items.map((item) => {
                return toCalendarEvent(item);
            }));

            setLoading(false);
        });
    };

    useEffect(() => {
        if (!userState.loaded) {
            return;
        }

        const firstVisibleDay = DateTime.fromJSDate(new Date()).startOf('month').startOf('week');
        const lastVisibleDay = DateTime.fromJSDate(new Date()).endOf('month').endOf('week');

        onRangeChange({start: firstVisibleDay.toJSDate(), end: lastVisibleDay.toJSDate()});
    }, [userState.loaded]);

    return (
        <main>
            <Container>
                <Box marginTop={'20px'}>
                    <Paper elevation={3} style={{height: '600px', position: "relative"}}>
                        <Calendar
                            localizer={localizer}
                            events={eventsList}
                            startAccessor="start"
                            endAccessor="end"
                            onRangeChange={onRangeChange}
                            views={["month"]}
                            eventPropGetter={eventPropsGetter}
                        />
                        {loading && (
                            <Backdrop
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1000, position: "absolute" }}
                                open={true}
                            >
                                {/* <CircularProgress color="inherit" /> */}
                                <Loading/>
                            </Backdrop>
                            
                        )}
                    </Paper>
                </Box>
            </Container>
        </main>
    );
}

export default CalendarComponent
