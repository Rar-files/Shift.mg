import type {NextPage} from 'next'
import styled from 'styled-components';
import LoginBtn from '../../components/Auth/LoginBtn';
import Image from "next/image";
import {Check as CheckIcon, Close as CloseIcon} from "@material-ui/icons";
import Loading from "../../components/Loading";
import {useAppSelector} from "../../app";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {AuthStatus} from "../../features/authSlice";
import {useRouter} from "next/router";
import { getMemberInvite, memberInviteAccept, memberInviteDecline, UpdateMemberInvitePromise } from '../../app/services/event/MemberInviteService';
import { IMemberInvite } from '../../interfaces/IMemberInvite';


const Invite: NextPage = () => {
    const router = useRouter();

    const inviteId = router.query.id as string;

    const [invState, setInvState] = useState<IMemberInvite | null>(null);

    const onAccept = () => {
        memberInviteAccept(inviteId).then((promise) => {
            onPutSuccess(promise);
        });
    };

    const onReject = () => {
        memberInviteDecline(inviteId).then((promise) => {
            onPutSuccess(promise);
        })
    };

    const onPutSuccess = (promise : UpdateMemberInvitePromise) => {
        if(promise.status) {
            router.push(`/events/${invState?.event.id}`);
        }
        else {
            console.log("error");
        }
    };

    useEffect(() => {
        if (invState !== null || inviteId === undefined) {
            return;
        }

        getMemberInvite(inviteId).then((promise) => {
            setInvState(promise.data);
        });
    }, [inviteId,invState, setInvState]);

    return (
        <>
            {invState !== null
                ?<Container>
                    <Box m={20} display="flex" justifyContent="center" alignItems="center">
                        <Paper elevation={3}>
                            <Box p={4}>
                                <Box style={{height: 30}}/>

                                <Box>    
                                    <Typography align="center">{invState.user.displayName},</Typography>
                                    <Typography align="center">you&apos;ve been invited to {invState.event.name} as {invState.role.name}</Typography>
                                </Box>

                                <Box style={{height: 20}}/>

                                <Box display="flex" justifyContent="space-evenly" alignItems="center">
                                    <Button variant="contained" color="primary" size="small" onClick={onAccept}>
                                        <CheckIcon fontSize="small" />
                                        Apply
                                    </Button>
                                    <Button variant="outlined" size="small" onClick={onReject}>
                                        <CloseIcon fontSize="small" />
                                        Reject
                                    </Button>
                                </Box>

                                <Box style={{height: 30}}/>
                            </Box>
                        </Paper>
                    </Box>
                </Container>

                :<Loading/>
            }
        </>
    )
}

export default Invite;
