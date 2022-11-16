import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';

import styled from 'styled-components';
import {useEffect, useState} from "react";
import {DeleteEvent, GetEvent} from "../../app/services/event/EventService";
import {IEvent} from "../../interfaces/IEvent";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    Grid,
    Paper,
    Typography,
} from "@material-ui/core";
import Loading from "../../components/Loading";
import {Delete as DeleteIcon, Edit as EditIcon} from "@material-ui/icons/";
import moment from 'moment';
// import Members from '../../components/Events/EventDetail/Members';
// import Roles from '../../components/Events/EventDetail/Roles';

const EventDiv = styled.div`
    overflow: auto;
    height: 100vh;
`;

const ButtonSeperator = styled.div`
    padding: 6px;
`;

const Event: NextPage = () => {
    const router = useRouter();

    const eventId = router.query.id as string;

    const [state, setState] = useState<IEvent | null>(null);
    
    /* DIALOG OPEN STATES */
    const [failedDeleteOpen, setfailedDeleteOpen] = useState(false);
    const [membersListView, setMembersListView] = useState(true);
    const [rolesListView, setRolesListView] = useState(false);

    const editEvent = () =>{
        router.push(`/events/edit/${eventId}`)
    }

    const DynamicRoles = dynamic(() => import('../../components/Events/EventDetail/Roles'));
    const DynamicMembers = dynamic(() => import('../../components/Events/EventDetail/Members'));

    const deleteEvent = () =>{
        DeleteEvent(eventId).then(deletePromise => {
            if(deletePromise.succeeded)
                router.push(`/events`)
            else
                onDeleteFailed();
        })
    }

    const onDeleteFailed = () =>{
        setfailedDeleteOpen(true);
        setTimeout(() => setfailedDeleteOpen(false),2000);
    }

    useEffect(() => {
        if (state !== null || eventId === undefined) {
            return;
        }

        GetEvent(eventId).then((promise) => {
            setState(promise.data as IEvent);
        });
    }, [eventId, state]);

    return (
        <main>
            <EventDiv>
                {state === null &&
                    <Loading/>
                }
                {state !== null &&
                    <Container>
                        <Box marginTop={'20px'} marginBottom={'20px'}>
                            <Paper elevation={3}>

                                <Box padding={'20px'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Typography>{state?.name}</Typography>
                                    <Box style={{display: 'flex', flexDirection: 'row'}}>

                                        <Button variant="contained" color="primary" size="small" onClick={() => editEvent()}>
                                            <EditIcon fontSize="small" />
                                            Edit
                                        </Button>
                                        
                                        <ButtonSeperator/>

                                        <Button variant="contained" color="primary" size="small" onClick={() => deleteEvent()}>
                                            <DeleteIcon fontSize="small" />
                                            Delete
                                        </Button>
                                        
                                        <Dialog open={failedDeleteOpen}>
                                            <DialogTitle>Couldn&apos;t delete event</DialogTitle>
                                            <DialogContent style={{width: '400px'}}>
                                                <Typography>You are not authorized</Typography>
                                            </DialogContent>
                                        </Dialog>
                                    </Box>
                                </Box>

                                <Divider />

                                <Box padding={'20px'}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>Start time</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{moment(state?.startDate).format("DD MMM YYYY")}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>End time</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{moment(state?.endDate).format("DD MMM YYYY")}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>Localization</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{state?.location}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Typography>Description</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={9}>
                                            <Typography>{state?.description}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Divider />

                                <Box padding={'10px'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>

                                    <Button variant="text" color={membersListView ? "secondary" : "default"} size="medium" onClick={() => {setMembersListView(true); setRolesListView(false)}}>
                                        Members
                                    </Button>

                                    <Divider orientation='vertical' />

                                    <Button variant="text" color={rolesListView ? "secondary" : "default"} size="medium" onClick={() => {setMembersListView(false); setRolesListView(true)}}>
                                        Roles
                                    </Button>

                                </Box>
                                
                                <Divider />

                                {membersListView && <DynamicMembers eventId={eventId}/>}

                                {rolesListView && <DynamicRoles eventId={eventId}/>}

                            </Paper>
                        </Box>
                    </Container>
                }
            
            </EventDiv>
        </main>
    )
}

export default Event
