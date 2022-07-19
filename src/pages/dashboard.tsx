import type { NextPage } from 'next'
import {Backdrop, Box, CircularProgress, Container, Paper} from "@material-ui/core";
import {Calendar} from "react-big-calendar";
import {luxonLocalizer} from "react-big-calendar";
import {DateTime} from "luxon";
import {getUserEvents, GetUserEventsFilters} from "../app/services/event/EventService";
import {useAppSelector} from "../app";
import {useEffect, useState} from "react";

// @ts-ignore
const localizer = luxonLocalizer(DateTime, {firstDayOfWeek: 1});

const Dashboard: NextPage = () => {
    const userState = useAppSelector(state => state.user);
    const [eventsList, setEventsList] = useState<any[]>([]);
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
                return {
                    id: item.id,
                    title: item.name,
                    start: item.startDate,
                    end: item.endDate
                };
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
                        />
                        {loading && (
                            <Backdrop
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1000, position: "absolute" }}
                                open={true}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        )}
                    </Paper>
                </Box>
            </Container>
        </main>
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
