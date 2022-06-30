import type { NextPage } from 'next'
import router, { useRouter } from 'next/router'
import styled from 'styled-components'
import {useEffect, useState} from "react";
import {getEvent} from "../../app/services/event/EventService";
import {IEvent} from "../../interfaces/IEvent";
import {
    Box,
    Button,
    Container,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Paper, TextField,
    Typography
} from "@material-ui/core";
import Loading from "../../components/Loading";
import EventsList from "../../components/Events/EventsList";
import {IMember} from "../../interfaces/IMember";
import {getMembersForEvent} from "../../app/services/event/MemberService";
import {DataGrid, GridColDef, GridRowData} from "@material-ui/data-grid";
import AddBoxIcon from "@material-ui/icons/AddBox";
import UserAutocomplete from "../../components/User/UserAutocomplete/UserAutocomplete";
import EventRoleAutocomplete from "../../components/Events/EventRoleAutocomplete/EventRoleAutocomplete";
import {IRole} from "../../interfaces/IRole";
import {getRolesForEvent} from "../../app/services/event/RoleService";


const EventPage = styled.div`
  padding: 20px;
  color: white;
  font-size: 40px;
`;

interface EventDetailsState {
    event: IEvent | null;
    members: IMember[] | null;
    roles: IRole[] | null;
}

const Event: NextPage = () => {
    const router = useRouter();
    const eventId = router.query.id as string;

    const [state, setState] = useState<EventDetailsState>({event: null, members: null, roles: null} as EventDetailsState);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (state.event !== null || eventId === undefined) {
            return;
        }

        getEvent(eventId).then((promise) => {
            setState({...state, event: promise.data} as EventDetailsState);
        });
    }, [eventId, state]);

    useEffect(() => {
        if (state.event !== null && state.members === null) {
            getMembersForEvent(eventId).then((promise) => {
                setState({...state, members: promise.data?.items} as EventDetailsState);
            });
        }

        if (state.event !== null && state.roles === null) {
            getRolesForEvent(eventId).then((promise) => {
                setState({...state, roles: promise.data?.items} as EventDetailsState);
            });
        }
    }, [eventId, state]);

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'displayName',
            headerName: 'Nazwa',
            width: 150,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Rola',
            type: 'number',
            width: 110,
            editable: true,
        },
    ];

    let rows: GridRowData[] = [];
    if (state.members !== null) {
        rows = state.members?.map((member: IMember) => {
            return {id: member.id, displayName: member.user.displayName, role: member.role.name};
        });
    }

    const roleColumns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'name',
            headerName: 'Nazwa',
            width: 150,
            editable: true,
        },
    ];

    let roleRows: GridRowData[] = [];
    if (state.roles !== null) {
        roleRows = state.roles?.map((role: IRole) => {
            return {id: role.id, name: role.name};
        });
    }

    return (
        <main>
            {state.event === null &&
                <Loading/>
            }
            {state.event !== null &&
                <Container>
                    <Box marginTop={'20px'}>
                        <Paper elevation={3}>
                            <Box padding={'20px'}>
                                <Typography>{state.event?.name}</Typography>
                            </Box>
                            <Divider />
                            <Box padding={'20px'}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} sm={3}>
                                        <Typography>Data rozpoczęcia</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={9}>
                                        <Typography>{state.event?.startDate}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography>Data zakończenia</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={9}>
                                        <Typography>{state.event?.endDate}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography>Lokalizacja</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={9}>
                                        <Typography>{state.event?.location}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography>Opis</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={9}>
                                        <Typography>{state.event?.description}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography>Włączone zmiany?</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={9}>
                                        <Typography>{state.event?.shiftsEnabled ? "Tak" : "Nie"}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider />
                            <Box padding={'20px'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Typography color={"secondary"}>Members</Typography>
                                <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>
                                    <AddBoxIcon fontSize="small" />
                                    Invite
                                </Button>
                            </Box>
                            <Divider />
                            <Box padding={'20px'} style={{height: 250}}>
                                {state.members === null &&
                                    <Loading/>
                                }
                                {state.members !== null &&
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        checkboxSelection
                                        disableSelectionOnClick
                                    />
                                }
                            </Box>
                            <Divider />
                            <Box padding={'20px'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Typography color={"secondary"}>Roles</Typography>
                                <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>
                                    <AddBoxIcon fontSize="small" />
                                    Create
                                </Button>
                            </Box>
                            <Divider />
                            <Box padding={'20px'} style={{height: 250}}>
                                {state.roles === null &&
                                    <Loading/>
                                }
                                {state.roles !== null &&
                                    <DataGrid
                                        rows={roleRows}
                                        columns={roleColumns}
                                        checkboxSelection
                                        disableSelectionOnClick
                                    />
                                }
                            </Box>
                        </Paper>
                    </Box>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Invite member</DialogTitle>
                        <DialogContent style={{width: '400px'}}>
                            <Typography>Email address</Typography>
                            <UserAutocomplete onlyExistingUsers={false} />
                            <Typography style={{marginTop: '25px'}}>Select a role</Typography>
                            <EventRoleAutocomplete eventId={state.event.id} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Invite
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            }
        </main>
    )
}

export default Event
