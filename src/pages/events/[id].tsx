import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import {useEffect, useState} from "react";
import {getEvent} from "../../app/services/event/EventService";
import {IEvent} from "../../interfaces/IEvent";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import Loading from "../../components/Loading";
import {IMember} from "../../interfaces/IMember";
import {DeleteMember, getMembersForEvent} from "../../app/services/event/MemberService";
import {DataGrid, GridColDef, GridRowData, GridSelectionModel} from "@material-ui/data-grid";
import {AddBox as AddBoxIcon, Delete as DeleteIcon} from "@material-ui/icons/";
import {IRole} from "../../interfaces/IRole";
import EventInviteDialog from "../../components/Events/EventInviteDialog/EventInviteDialog";
import {DeleteRole, getRolesForEvent} from "../../app/services/event/RoleService";
import EventAddRoleDialog from "../../components/Events/EventAddRoleDialog/EventAddRoleDialog";
import styled from 'styled-components';

const EventDiv = styled.div`
    overflow: auto;
    height: 100vh;
`;

const ButtonSeperator = styled.div`
    padding: 6px;
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

    const [selectionMembers, setSelectionMembers] = useState<GridSelectionModel>([]);
    const [selectionRoles, setSelectionRoles] = useState<GridSelectionModel>([]);
    
    /* DIALOG OPEN STATES */
    const [inviteOpen, setInviteOpen] = useState(false);
    const [addRoleOpen, setAddRoleOpen] = useState(false);

    const onAddRoleDialogClose = (roleAdded: boolean) => {
        setAddRoleOpen(false);

        if (roleAdded) {
            setState({...state, roles: null});
        }
    };

    const deleteSelectedMembers = () => {
        const selectedIDs = new Set(selectionMembers);
        
        selectedIDs.forEach((id) => {
            DeleteMember(id as string).then((promise) => {
                if(!promise.succeeded)
                {
                    console.log(promise);
                }
            });
        });

        window.location.reload()
    }

    const deleteSelectedRoles = () => {
        const selectedIDs = new Set(selectionRoles);
        
        selectedIDs.forEach((id) => {
            DeleteRole(id as string).then((promise) => {
                if(!promise.succeeded)
                {
                    console.log(promise);
                }
            });
        });

        window.location.reload()
    }

    console.log(selectionRoles)

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
        // {
        //     field: "delete",
        //     width: 75,
        //     sortable: false,
        //     disableColumnMenu: true,
        //     renderHeader: () => {
        //         return (
        //             <Button
        //                 onClick={() => {
        //                     const selectedIDs = new Set(selectionModel);
                            
        //                     selectedIDs.forEach((id) => {
        //                         DeleteMember(id as string).then((promise) => {
        //                             if(!promise.succeeded)
        //                             {
        //                                 console.log(promise);
        //                             }
        //                         });
        //                     });

        //                     window.location.reload()
        //                 }}>
                            
        //                 <DeleteIcon />
        //             </Button>
        //         );
        //     }
        // }
    ];

    let memberRows: GridRowData[] = [];

    if (state.members !== null) {
        memberRows = state.members?.map((member: IMember) => {
            return {id: member.id, displayName: member.user.displayName, role: member.role.name};
        });
    }

    const roleColumns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'name',
            headerName: 'Name',
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
            <EventDiv>
                {state.event === null &&
                    <Loading/>
                }
                {state.event !== null &&
                    <Container>
                        <Box marginTop={'20px'} marginBottom={'20px'}>
                            <Paper elevation={3}>
                                <Box padding={'20px'}>
                                    <Typography>{state.event?.name}</Typography>
                                </Box>
                                <Divider />
                                <Box padding={'20px'}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>Start time</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{state.event?.startDate}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>End time</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{state.event?.endDate}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>Localization</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{state.event?.location}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>Description</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{state.event?.description}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>Shifts?</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{state.event?.shiftsEnabled ? "Yes" : "No"}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Divider />
                                <Box padding={'20px'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Typography color={"secondary"}>Members</Typography>
                                    <Box style={{display: 'flex', flexDirection: 'row'}}>
                                        {selectionMembers.length > 0 && <Button variant="contained" color="primary" size="small" onClick={() => deleteSelectedMembers()}>
                                            <DeleteIcon fontSize="small" />
                                            Delete
                                        </Button>
                                        }
                                        <ButtonSeperator/>

                                        <Button variant="contained" color="primary" size="small" onClick={() => setInviteOpen(true)}>
                                            <AddBoxIcon fontSize="small" />
                                            Invite
                                        </Button>
                                        <EventInviteDialog open={inviteOpen} eventId={state.event.id} onClose={() => setInviteOpen(false)} />
                                    </Box>
                                </Box>
                                <Divider />
                                <Box padding={'20px'} style={{height: 250}}>
                                    {state.members === null &&
                                        <Loading/>
                                    }
                                    {state.members !== null &&
                                        <DataGrid
                                            rows={memberRows}
                                            columns={columns}
                                            checkboxSelection
                                            disableSelectionOnClick
                                            onSelectionModelChange={(ids) => {
                                                setSelectionMembers(ids);
                                            }}
                                        />
                                    }
                                </Box>
                                <Divider />
                                <Box padding={'20px'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Typography color={"secondary"}>Roles</Typography>
                                    <Box style={{display: 'flex', flexDirection: 'row'}}>
                                        {selectionRoles.length > 0 && <Button variant="contained" color="primary" size="small" onClick={() => deleteSelectedRoles()}>
                                            <DeleteIcon fontSize="small" />
                                            Delete
                                        </Button>
                                        }
                                        <ButtonSeperator/>

                                        <Button variant="contained" color="primary" size="small" onClick={() => setAddRoleOpen(true)}>
                                            <AddBoxIcon fontSize="small" />
                                            Create
                                        </Button>
                                    </Box>
                                    <EventAddRoleDialog open={addRoleOpen} eventId={state.event.id} onClose={onAddRoleDialogClose} />
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
                                            onSelectionModelChange={(ids) => {
                                                setSelectionRoles(ids);
                                            }}
                                        />
                                    }
                                </Box>
                            </Paper>
                        </Box>
                    </Container>
                }
            
            </EventDiv>
        </main>
    )
}

export default Event
