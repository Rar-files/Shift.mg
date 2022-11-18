import { FC } from "react";
import {IEvent} from "../../../interfaces/IEvent";
import router from "next/router";
import {
    Box,
    Container,
    Divider,
    Paper,
    Typography
} from "@material-ui/core";
import Loading from "../../Loading";
import { DataGrid, GridColDef, GridRowData } from "@material-ui/data-grid";

export enum ViewType {
    list = 1,
    tiles = 2
}

type EventListProps = {
    events: IEvent[];
    onEventClick: (eventId : string) => void;
};

const EventsList: FC<EventListProps> = (props) => {

    const goToDetails = (id: string) => {
        router.push(`/events/${id}`);
    };

    const columns: GridColDef[] = [
        {
            field: 'displayName',
            headerName: 'Name',
            width: 150,
            editable: false,
        },
        {
            field: 'startDate',
            headerName: 'Start',
            width: 102,
            editable: false,
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value as string)
        },
        {
            field: 'endDate',
            headerName: 'End',
            width: 102,
            editable: false,
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value as string)
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 120,
            editable: false,
        },
        {
            field: 'visibility',
            headerName: 'Visibility',
            width: 150,
            editable: false,
        },
    ];

    let rows: GridRowData[] = [];
    if (props.events !== null) {
        rows = props.events?.map((event: IEvent) => {
            return {
                id: event.id, 
                displayName: event.name, 
                startDate: event.startDate, 
                endDate: event.endDate,
                location: event.location,
                visibility: event.visibility
            };
        });
    }

    return (
        <Container>
                    <Box marginTop={'20px'}>
                        <Paper elevation={3}>
                            <Box padding={'20px'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Typography color={"secondary"}>Events: </Typography>
                            </Box>
                            <Divider />
                            <Box padding={'20px'} style={{height: 250}}>
                                {props.events === null &&
                                    <Loading/>
                                }
                                {props.events !== null &&
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        disableSelectionOnClick
                                        onRowClick={(row) => props.onEventClick(row.id as string)}
                                    />
                                }
                            </Box>
                        </Paper>
                    </Box>
                </Container>
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
